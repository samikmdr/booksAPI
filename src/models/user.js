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
 *        full_name: 
 *          type: string
 *          example: Ram Shrestha
 *        phone: 
 *          type: string
 *          example: 9841223344
 *        email: 
 *          type: string
 *          example: ram@abc.com
 *        user_name: 
 *          type: string
 *          example: ram123
 *        gender: 
 *          type: string
 *          example: male
 *        address: 
 *          type: string
 *          example: Balaju, Kathmandu
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
      User.hasMany(models.LendDetails, {
        foreignKey: 'borrower_id'
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
    },
    gender:{
      type: DataTypes.STRING,
      allowNull: false
    },
    address:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};