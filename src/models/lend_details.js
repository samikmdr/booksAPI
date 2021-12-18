'use strict';
const {
  Model
} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class LendDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  LendDetails.init({
    shelf_id: DataTypes.INTEGER,
    borrower_id: DataTypes.INTEGER, 
    lend_status: DataTypes.ENUM('0', '1', '2'),
  }, {
    sequelize,
    tableName: 'Lend_Details',
    modelName: 'LendDetails',
  });
  return LendDetails;
};