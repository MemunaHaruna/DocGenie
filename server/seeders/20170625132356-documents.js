'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Documents', [{
      title: 'The Awakening',
      content: `Hello, My name is Abiodun and I need to take time off
      work, " The dark nerdy-looking young man
      beside me said and the entire room chuckled.`,
      userId: 1,
      access: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Esther\'s doc',
      content: `Esther was excited, super excited to be travelling to
      see her paternal grandmother in Ijebu-Ode for the Sallah break.`,
      userId: 2,
      access: -1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Seyi\'s doc',
      content: 'I\'m super excited about today!',
      userId: 2,
      access: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Documents', null, {});
  }
};
