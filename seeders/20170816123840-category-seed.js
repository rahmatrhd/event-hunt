'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Categories', [{
      label: 'art',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'travel',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'game',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'music',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'sport',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'read',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'technology',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'cooking',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'toys',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'farming',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
