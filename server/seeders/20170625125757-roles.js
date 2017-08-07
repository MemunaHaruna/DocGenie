'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Roles', [{
      title: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
