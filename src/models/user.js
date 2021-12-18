'use strict';
const {
  Model
} = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        fname: 
 *          type: string
 *          example: Ram
 *        lname: 
 *          type: string
 *          example: Shrestha
 *        email: 
 *          type: string
 *          example: ram@abc.com
 *        user_name: 
 *          type: string
 *          example: ram123
 *        createdAt: 
 *          type: string
 *          example: 2021-11-14T03:43:18.227Z
 *        updatedAt: 
 *          type: string
 *          example: 2021-11-14T03:43:18.227Z
 */


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.User_Role, {
        foreignKey: 'user_id'
      });
      User.hasMany(models.BookShelf, {
        foreignKey: 'user_id'
      })
    }
  };
  User.init({
    full_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    phone:{
      type: DataTypes.BIGINT
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};