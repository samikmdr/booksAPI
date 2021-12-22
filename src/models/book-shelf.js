'use strict';
const {
  Model
} = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *    BookShelf:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        user_id: 
 *          type: string
 *          example: 2
 *        book_id: 
 *          type: string
 *          example: 1001
 *        available: 
 *          type: boolean
 *          example: true
 *        lend_flag: 
 *          type: boolen
 *          example: false
 */

module.exports = (sequelize, DataTypes) => {
  class BookShelf extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BookShelf.belongsTo(models.User, {
          foreignKey: 'user_id'
      })
      BookShelf.belongsTo(models.Book, {
          foreignKey: 'book_id'
      })
      BookShelf.hasMany(models.LendDetails, {
        foreignKey: 'shelf_id'
      })
    }
  };
  BookShelf.init({
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER, 
    available: DataTypes.BOOLEAN,
    lend_flag: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'Book_shelf',
    modelName: 'BookShelf',
  });
  return BookShelf;
};