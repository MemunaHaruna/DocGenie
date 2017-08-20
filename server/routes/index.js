const rolesController = require('../controllers').roles;
const UsersController = require('../controllers').users;
const DocumentsController = require('../controllers').documents;
const authentication = require('../middleware/authentication');

module.exports = (app) => {
  app.get('/api', (request, response) => response.status(200).send({
    message: 'Welcome to the DocGenie API!',
  }));

  // roles routes
  app.post('/api/v1/roles', authentication.verifyAdminAccess,
    rolesController.createNewRole);
  app.get('/api/v1/roles', authentication.verifyAdminAccess,
    rolesController.listAllRoles);
  app.delete('/api/v1/roles/:id', authentication.verifyAdminAccess,
    rolesController.destroyARole);

  // user routes
  app.post('/auth/api/v1/users', UsersController.createNewUser);
  app.get('/api/v1/users', authentication.verifyAdminAccess,
    UsersController.listAllUsers);
  app.get('/api/v1/users/:id', UsersController.findAUser);
  app.get('/api/v1/users/:id/documents', UsersController.findUserDocuments);
  app.put('/api/v1/users/:id', UsersController.updateAUser);
  app.delete('/api/v1/users/:id', UsersController.deleteAUser);
  app.post('/auth/api/v1/users/login', UsersController.signIn);
  app.get('/api/v1/users/logout', UsersController.signOut);

  // document routes
  app.post('/api/v1/documents', DocumentsController.createADocument);
  app.get('/api/v1/documents', DocumentsController.listAllDocuments);
  app.get('/api/v1/documents/:id', DocumentsController.findADocument);
  app.put('/api/v1/documents/:id', DocumentsController.updateADocument);
  app.delete('/api/v1/documents/:id', DocumentsController.deleteADocument);

  // search routes
  app.get('/api/v1/search/users', UsersController.searchForUser);
  app.get('/api/v1/search/documents',
    DocumentsController.searchForDocument);
};
