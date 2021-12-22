'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Lend_Details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shelf_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Book_shelf',
          key: 'id'
        }
      },
      borrower_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      lend_status: {
        type: Sequelize.ENUM('-1', '0', '1', '2', '3')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: { 
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Lend_Details')
    .then(async ()=>{
     await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Lend_Details_lend_status";'); 
    })
    
  }
};
