'use strict';
const {
  Model
} = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *    LendDetails:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        shelf_id: 
 *          type: string
 *          example: 2
 *        borrower_id: 
 *          type: string
 *          example: 10
 *        lend_status: 
 *          type: string
 *          example: 0
 */

module.exports = (sequelize, DataTypes) => {
  class LendDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LendDetails.belongsTo(models.BookShelf, {
          foreignKey: 'shelf_id'
      })
      LendDetails.belongsTo(models.User, {
          foreignKey: 'borrower_id'
      })
    }
  };
  LendDetails.init({
    shelf_id: DataTypes.INTEGER,
    borrower_id: DataTypes.INTEGER, 
    lend_status: DataTypes.ENUM('-1', '0', '1', '2'),
  }, {
    sequelize,
    tableName: 'Lend_Details',
    modelName: 'LendDetails',
  });
  return LendDetails;
};