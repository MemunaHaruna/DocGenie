const bcrypt = require('bcrypt-nodejs');
const User = require('../models').User;
const Document = require('../models').Document;
const authentication = require('../middleware/authentication');
const errorHandler = require('../helpers/errorHandler');
const pagination = require('../helpers/pagination').pagination;

const LIMIT = 6;
const OFFSET = 0;

module.exports = {

  /**
  * @description - Creates a new user
  * @param {object} request - request object received from the client
  * @param {object} response - response object served to the client
  * @returns {promise} user - new user created
  */
  createNewUser(request, response) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!request.body.fullname || !request.body.username || !request.body.email
    || !request.body.password || !request.body.confirmPassword) {
      return response.status(400).json({
        message: 'Please fill all the fields'
      });
    }

    if (!emailRegex.test(request.body.email)) {
      return response.status(400).json({
        message: 'Email is not rightly formatted',
      });
    }
    if (request.body.password.length < 6) {
      return response.status(400).json({
        message: 'Password length must be more than 6 characters'
      });
    }

    if (request.body.username.length < 2 && request.body.username.length > 30) {
      return response.status(400).json({
        message: 'Username length must be between 2 and 30 characters'
      });
    }

    if (request.body.fullname.length < 3 || request.body.fullname.length > 40) {
      return response.status(400).json({
        message: 'Fullname length must be between 3 and 40 characters'
      });
    }
    if (request.body.password !== request.body.confirmPassword) {
      return response.status(400).json({ message: 'Password does not match' });
    }
    if (Number(request.body.roleId) === 1
    && request.decoded.roleId && Number(request.decoded.roleId) !== 1) {
      return response.status(403).json({
        message: 'You are not allowed to create an admin user',
      });
    }
    return User.findAll({
      where: {
        $or: [
          {
            username: request.body.username
          },
          {
            email: request.body.email
          }
        ]
      },
    }).then((existingUser) => {
      if (existingUser.length > 0) {
        return response.status(409).json({ message:
           'Username or email already exists' });
      }
      return User
        .create({
          username: request.body.username,
          fullname: request.body.fullname,
          roleId: request.body.roleId,
          email: request.body.email,
          password: request.body.password,
        });
    }).then((user) => {
      const token = authentication.generateToken(user);
      return response.status(200).json({
        message: 'Signed up successfully',
        user: user.filterUserDetails(),
        token,
      });
    }).catch((error) => {
      const errorMessage = error.message || error;
      const customError =
        errorHandler.filterSequelizeErrorMessage(errorMessage);
      return response.status(500).json({ message: customError });
    });
  },

  /**
  * @description - signs in a new user
  * @param {object} request - request object received from the client
  * @param {object} response - response object served to the client
  * @returns {json} user - user details
  */
  signIn(request, response) {
    if (!request.body.email || !request.body.password) {
      return response.status(400).json({
        message: 'Enter all required fields'
      });
    }
    return User.findOne({
      where: {
        email: request.body.email
      }
    }).then((user) => {
      if (!user) {
        return response.status(401).json({ message: 'Not an existing user' });
      } else if (!user.validatePassword(request.body.password, user)) {
        return response.status(400).json({ message: 'Invalid password' });
      }
      // if user is found and password is right,
      // create a token
      const token = authentication.generateToken(user);

      return response.status(200).json({
        message: 'Signed in successfully',
        user: user.filterUserDetails(),
        token,
      });
    }).catch((error) => {
      const errorMessage = error.message || error;
      const customError =
        errorHandler.filterSequelizeErrorMessage(errorMessage);
      return response.status(500).json({ message: customError });
    });
  },

  /**
  * @description - Fetches all users
  * @param {object} request - request object received from the client
  * @param {object} response - response object served to the client
  * @returns {promise} users - users fetched
  */
  listAllUsers(request, response) {
    const limit = request.query.limit || LIMIT;
    const offset = request.query.offset || OFFSET;
    const { userId } = request.decoded;
    return User
      .findAndCountAll({
        where: {
          id: {
            $ne: userId
          }
        },
        limit,
        offset,
        order: '"createdAt" DESC',
      })
      .then((users) => {
        if (!users) {
          return response.status(404).json({ message: 'User Not Found' });
        }

        return response.status(200).json({
          users: users.rows.map(user => user.filterUserDetails()),
          pagination: pagination(users.count, users.rows, limit, offset)
        });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        const customError =
          errorHandler.filterSequelizeErrorMessage(errorMessage);
        return response.status(500).json({ message: customError });
      });
  },

  /**
  * @description - Fetches a user
  * @param {object} request - request object received from the client
  * @param {object} response - response object served to the client
  * @returns {json} user - fetched user
  */
  findAUser(request, response) {
    return User
      .findById(request.params.id)
      .then((user) => {
        if (!user) {
          return response.status(404).json({ message: 'User Not Found' });
        }
        return response.status(200).json(user.filterUserDetails());
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        const customError =
          errorHandler.filterSequelizeErrorMessage(errorMessage);
        return response.status(500).json({ message: customError });
      });
  },

  /**
  * @description - Updates user details
  * @param {object} request - request object received from the client
  * @param {object} response - response object served to the client
  * @returns {json} user - updated user details
  */
  updateAUser(request, response) {
    return User
      .findById(request.params.id)
      .then((user) => {
        if (!user) {
          return response.status(404).json({ message: 'User Not Found' });
        }

        // validating user password, confirming if old password is correct
        if (request.body.oldPassword || request.body.password
         || request.body.confirmPassword) {
          if (!bcrypt.compareSync(request.body.oldPassword, user.password)) {
            return response.status(400).json({ message:
               'Old password is incorrect' });
          }
          // checking if password and confirmPassword fields match
          if (request.body.password &&
          (request.body.password !== request.body.confirmPassword)) {
            return response.status(400).json({ message:
               'Passwords do not match' });
          }
          if (request.body.oldPassword === request.body.password) {
            return response.status(400).json({ message:
               'Please change your password' });
          }
        }
        let userDetails;

        if (request.decoded.userId === user.id && !request.body.roleId) {
          const { roleId, oldPassword, confirmPassword, ...rest } = request.body;
          userDetails = rest;
        } else if (request.decoded.roleId === 1 &&
          request.decoded.userId !== user.id && request.body.roleId) {
          const { roleId } = request.body;
          userDetails = { roleId };
        } else {
          return response.status(403).json({ message:
             'Sorry, you are not authorized for this action' });
        }
        return user
          .update(userDetails);
      }).then(user => response.status(200).json(user.filterUserDetails()))
      .catch((error) => {
        const errorMessage = error.message || error;
        const customError =
          errorHandler.filterSequelizeErrorMessage(errorMessage);
        return response.status(500).json({ message: customError });
      });
  },

  /**
  * @description - Deletes a user
  * @param {object} request - request object received from the client
  * @param {object} response - response object served to the client
  * @returns {promise} document - new document created
  */
  deleteAUser(request, response) {
    const { userId, roleId } = request.decoded;
    return User
      .findById(request.params.id)
      .then((user) => {
        if (!user) {
          return response.status(404).json({ message: 'User not found' });
        }
        // checking if a non-admin is trying to delete another user's account
        if (userId !== user.id && Number(roleId) !== 1) {
          return response.status(403).json({ message:
             'You\'re not authorized to delete another user' });
        }
        return user
          .destroy();
      }).then(() => response.status(200).json({ message:
         'User deleted successfully' }))
      .catch((error) => {
        const errorMessage = error.message || error;
        const customError =
          errorHandler.filterSequelizeErrorMessage(errorMessage);
        return response.status(500).json({ message: customError });
      });
  },

  /**
  * @description - Fetches a particular user's document(s)
  * @param {object} request - request object received from the client
  * @param {object} response - response object served to the client
  * @returns {promise} documents - fetched documents
  */
  findUserDocuments(request, response) {
    const limit = request.query.limit || LIMIT;
    const offset = request.query.offset || OFFSET;
    const { userId, roleId } = request.decoded;

    return Document
      .findAndCountAll({
        include: [{ model: User,
          as: 'user' }],
        where: {
          userId: request.params.id,
          $or: [
            { userId },
            { access: {
              $gte: roleId,
              $ne: -1
            }
            },
            { access: 0 }
          ]

        },
        limit,
        offset,
        order: '"createdAt" DESC',
      })
      .then((documents) => {
        if (!documents) {
          return response.status(404).json({
            message: 'Document(s) Not Found' });
        }
        return response.status(200).json({
          documents: documents.rows.map(({
            user, id, access, title, content,
            userId, createdAt, updatedAt }) => {
            return {
              id,
              access,
              title,
              content,
              userId,
              createdAt,
              updatedAt,
              user: user.filterUserDetails() };
          }),
          pagination: pagination(documents.count, documents.rows, limit, offset)
        });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        const customError =
          errorHandler.filterSequelizeErrorMessage(errorMessage);
        return response.status(500).json({ message: customError });
      });
  },

  /**
  * @description - Fetches searched users
  * @param {object} request - request object received from the client
  * @param {object} response - response object served to the client
  * @returns {json} users - fetched users
  */
  searchForUser(request, response) {
    const limit = request.query.limit || LIMIT;
    const offset = request.query.offset || OFFSET;

    return User
      .findAndCountAll({
        where: {
          $or: [
            {
              username: {
                $iLike: `%${request.query.searchKey}%`
              }
            },
            {
              fullname: {
                $iLike: `%${request.query.searchKey}%`
              }
            }
          ]
        },
        limit,
        offset,
        order: '"createdAt" DESC',
      }).then((users) => {
        if (!users) {
          return response.status(404).json({ message: 'No user(s) found' });
        }

        return response.status(200).json({
          users: users.rows.map(user => user.filterUserDetails()),
          pagination: pagination(users.count, users.rows, limit, offset)
        });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        const customError =
          errorHandler.filterSequelizeErrorMessage(errorMessage);
        return response.status(500).json({ message: customError });
      });
  },

  /**
  * @description - signs out a logged in user
  * @param {object} request - request object received from the client
  * @param {object} response - response object served to the client
  * @returns {json} message - message response returned
  */
  signOut(request, response) {
    return response.status(200).json({ message: 'Successfully logged out' });
  },
};
