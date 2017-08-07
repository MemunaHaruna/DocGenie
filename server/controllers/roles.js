const Role = require('../models').Role;
const errorHandler = require('../helpers/errorHandler');

module.exports = {
  createNewRole(request, response) {
    if (request.decoded && Number(request.decoded.roleId) !== 1) {
      return response.status(403).json({
        message: 'You are not allowed to create a new role',
      });
    }
    return Role.findAll({
      where: {
        title: request.body.title
      },
    }).then((existingRole) => {
      if (existingRole.length > 0) {
        return response.status(409).json({ message:
           'Role already exists' });
      }
      return Role
        .create({
          title: request.body.title,
        });
    }).then(role => response.status(201).json(role))
      .catch((error) => {
        const errorMessage = error.message || error;
        const customError =
        errorHandler.filterSequelizeErrorMessage(errorMessage);
        return response.status(500).json({ message: customError });
      });
  },
  listAllRoles(request, response) {
    return Role
      .all()
      .then(roles => response.status(200).json(roles))
      .catch((error) => {
        const errorMessage = error.message || error;
        const customError =
        errorHandler.filterSequelizeErrorMessage(errorMessage);
        return response.status(500).json({ message: customError });
      });
  },
  destroyARole(request, response) {
    return Role
      .findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404).json({
            message: 'Role Not Found',
          });
        }
        return role
          .destroy()
          .then(() => response.status(200).json({
            message: 'Role deleted successfully' }));
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        const customError =
        errorHandler.filterSequelizeErrorMessage(errorMessage);
        return response.status(500).json({ message: customError });
      });
  },
};
