'use strict';

const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'admin',
      fullname: 'admin',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('adminadmin', bcrypt.genSaltSync(8), null),
      roleId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'muna2',
      fullname: 'muna2',
      email: 'muna2@muna2.com',
      password: bcrypt.hashSync('muna2muna2', bcrypt.genSaltSync(8), null),
      roleId: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
