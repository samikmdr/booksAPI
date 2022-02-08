'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Lend_Details', 'pending_lend_confirmation', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    });
    await queryInterface.addColumn('Lend_Details', 'pending_return_confirmation', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Lend_Details', 'pending_lend_confirmation');
    await queryInterface.removeColumn('Lend_Details', 'pending_return_confirmation');
  }
};
