'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'fname','full_name' );
    await queryInterface.removeColumn('Users', 'lname');
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.BIGINT
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'full_name','fname' );
    await queryInterface.addColumn('Users', 'lname', {
      type: Sequelize.STRING
    });
    await queryInterface.removeColumn('Users', 'phone');
  }
};

