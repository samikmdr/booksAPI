'use strict';
const {
  Model
} = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *    Book:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        isbn: 
 *          type: string
 *          example: 1853262404
 *        book_title: 
 *          type: string
 *          example: Heart of Darkness
 *        book_author: 
 *          type: string
 *          example: Joseph Conrad
 *        year_of_publication: 
 *          type: string
 *          example: 1998
 *        createdAt: 
 *          type: string
 *          example: 2021-11-14T03:43:18.227Z
 *        updatedAt: 
 *          type: string
 *          example: 2021-11-14T03:43:18.227Z
 */


module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Book.init({
    isbn: DataTypes.STRING,
    book_title: DataTypes.STRING,
    book_author: DataTypes.STRING,
    year_of_publication: DataTypes.STRING,
    publisher: DataTypes.STRING,
    image_url_l: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'books',
    modelName: 'Book',
  });
  return Book;
};