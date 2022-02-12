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
 *        isbn13: 
 *          type: string
 *          example: 1853262404123
 *        title: 
 *          type: string
 *          example: Heart of Darkness
 *        original_title: 
 *          type: string
 *          example: Heart of Darkness
 *        authors: 
 *          type: string
 *          example: Joseph Conrad
 *        year_of_publication: 
 *          type: string
 *          example: 1998
 *        image_url: 
 *          type: string
 *          example: https://images.gr-assets.com/books/1447303603m/2767052.jpg
 */


module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.hasMany(models.BookShelf, {
        foreignKey: 'book_id'
      })
    }
  };
  Book.init({
    book_id: DataTypes.INTEGER,
    isbn: DataTypes.STRING,
    isbn13: DataTypes.STRING,
    authors: DataTypes.STRING,
    original_title: DataTypes.TEXT,
    title: DataTypes.TEXT,
    year_of_publication: DataTypes.STRING,
    image_url: DataTypes.TEXT,
    nepali_book: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'books',
    modelName: 'Book',
  });
  return Book;
};