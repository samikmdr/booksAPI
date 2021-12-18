'use strict';
const {
  Model
} = require('sequelize');



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