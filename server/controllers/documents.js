const Document = require('../models').Document;
const User = require('../models').User;
const errorHandler = require('../helpers/errorHandler');
const pagination = require('../helpers/pagination').pagination;

const LIMIT = 6;
const OFFSET = 0;

module.exports = {
  /**
  * @description - Creates a new document
  * @param {object} request - request object received from the client
  * @param {object} response - response object served to the client
  * @returns {promise} document - new document created
  */
  createADocument(request, response) {
    if (!request.body.title || !request.body.content ||
    request.body.access === null) {
      return response.status(400).json({
        message: 'Please fill all fields' });
    }

    if (request.body.title.length < 2 || request.body.title.length > 60
    || request.body.content.length < 3) {
      return response.status(400).json({
        message: 'Title and content length must be more than 2 letters'
      });
    }
    return Document
      .create({
        userId: request.decoded.userId,
        title: request.body.title,
        access: request.body.access,
        content: request.body.content
      })
      .then(document => response.status(201).json(document))
      .catch((error) => {
        const errorMessage = error.message || error;
        const customError =
         errorHandler.filterSequelizeErrorMessage(errorMessage);
        return response.status(500).json({ message: customError });
      });
  },

  /**
  * @description - Fetches all documents which the current user can view
  * @param {object} request - request object received from the client
  * @param {object} response - response object served to the client
  * @returns {promise} documents - all documents fetched
  */
  listAllDocuments(request, response) {
    const limit = request.query.limit || LIMIT;
    const offset = request.query.offset || OFFSET;
    const { roleId, userId } = request.decoded;
    return Document
      .findAndCountAll({
        include: [{ model: User,
          as: 'user',
          attributes: ['id', 'username', 'roleId', 'fullname', 'email']
        }],
        where: {
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
          return response.status(404).json({ message: 'No documents found' });
        }
        return response.status(200).json({
          documents: documents.rows,
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
  * @description - Fetches a documents if the current user has access to view
  * @param {object} request - request object received from the client
  * @param {object} response - response object served to the client
  * @returns {promise} document - the document fetched
  */
  findADocument(request, response) {
    const { roleId, userId } = request.decoded;
    return Document
      .findOne({
        include: [{ model: User,
          as: 'user',
          attributes: ['id', 'username', 'roleId', 'fullname', 'email']
        }],
        where: {
          id: request.params.id,
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
      })
      .then((document) => {
        if (!document) {
          return response.status(404).json({ message: 'Document Not Found' });
        }
        return response.status(200).json(document);
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        const customError =
          errorHandler.filterSequelizeErrorMessage(errorMessage);
        return response.status(500).json({ message: customError });
      });
  },

  /**
  * @description - Updates a document and returns the edited document
  * @param {object} request - request object received from the client
  * @param {object} response - response object served to the client
  * @returns {promise} document - the edited document
  */
  updateADocument(request, response) {
    return Document
      .findById(request.params.id)
      .then((document) => {
        if (!document) {
          return response.status(404).json({ message: 'Document Not Found' });
        }
        if (request.decoded.userId !== document.userId) {
          return response.status(403).json({
            message: 'You are not allowed to update this document' });
        }
        return document
          .update({
            userId: request.body.userId || document.userId,
            title: request.body.title || document.title,
            access: request.body.access || document.access,
            content: request.body.content || document.content,
          });
      }).then((updatedDocument) => {
        return response.status(200).json(updatedDocument);
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        const customError =
          errorHandler.filterSequelizeErrorMessage(errorMessage);
        return response.status(500).json({ message: customError });
      });
  },

  /**
  * @description - Deletes a document
  * @param {object} request - request object received from the client
  * @param {object} response - response object served to the client
  * @returns {json} message, response or error
  */
  deleteADocument(request, response) {
    return Document
      .findById(request.params.id)
      .then((document) => {
        if (!document) {
          return response.status(404).json({ message: 'Document Not Found' });
        }
        if (request.decoded.userId !== document.userId) {
          return response.status(403).json({ message:
             'You are not allowed to delete this document' });
        }
        return document
          .destroy()
          .then(() => {
            return response.status(200).json({ message:
              'Document deleted successfully' });
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
  * @description - Search for particular document(s)
  * @param {object} request - request object received from the client
  * @param {object} response - response object served to the client
  * @returns {promise} document - the fetched document
  */
  searchForDocument(request, response) {
    const { roleId, userId } = request.decoded;
    const limit = request.query.limit || LIMIT;
    const offset = request.query.offset || OFFSET;

    return Document
      .findAndCountAll({
        include: [{ model: User,
          as: 'user',
          attributes: ['id', 'username', 'roleId', 'fullname', 'email']
        }],
        where: {
          $and: [
            {
              $or: [
                { title: { $iLike: `%${request.query.searchKey}%` } },
                { content: { $iLike: `%${request.query.searchKey}%` } }
              ]
            },
            {
              $or: [
                { userId },
                { access: {
                  $gte: roleId,
                  $ne: -1 }
                },
                { access: 0 }
              ],
            }
          ]
        },
        limit,
        offset,
        order: '"createdAt" DESC',
      }).then((documents) => {
        if (!documents) {
          return response.status(404).json({ message:
             'Document(s) Not Found' });
        }
        return response.status(200).json({
          documents: documents.rows,
          pagination: pagination(documents.count, documents.rows, limit, offset)
        });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        const customError =
          errorHandler.filterSequelizeErrorMessage(errorMessage);
        return response.status(500).json({ message: customError });
      });
  }
};
