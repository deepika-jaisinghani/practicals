'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.addColumn(
        'Users',
        'username',
        Sequelize.STRING
    ),
      queryInterface.addColumn(
          'Users',
          'password',
          Sequelize.STRING
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
