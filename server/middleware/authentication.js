const jwt = require('jsonwebtoken');

module.exports = {

  /**
   * @description - Validates registered users' token
   * @param {object} request - request object received from the client
   * @param {object} response - response object served to the client
   * @param {function} next - express callback function which invokes the next
   * middleware or route-handler
   * @returns {object} message - error response
   */
  verifyToken(request, response, next) {
    const token = request.headers.authorization ||
      request.headers['x-access-token'];
    request.decoded = {};
    if (token) {
      jwt.verify(token, process.env.JWTSECRET, (error, decoded) => {
        if (error) {
          return response.status(401).json({
            message: 'Session expired. Please login to continue',
          });
        }
        request.decoded = decoded;
        next();
      });
    } else {
      if (request.originalUrl.startsWith('/auth')) return next();
      return response.status(401).json({
        message: 'Token required for access',
      });
    }
  },

  /**
  * @description - Generates token for user authentication
  * @param {object} user - object containing user details
  * @returns {object} token - jwt token
  */
  generateToken(user) {
    return jwt.sign({
      userId: user.id,
      roleId: user.roleId,
    }, process.env.JWTSECRET, { expiresIn: '1 day' });
  },

  /**
  *
  * @desciption - Verifies admin access
  * @param {object} request - request object received from the client
  * @param {object} response object served to the client
  * @param {function} next - express callback function which invokes the next
   * middleware or route-handler
  * @returns {object} message - error response
  */
  verifyAdminAccess(request, response, next) {
    if (request.decoded.roleId === 1) {
      next();
    } else {
      return response.status(403).json({
        message: 'Sorry, You are not authorized to perform this action',
      });
    }
  }
};
