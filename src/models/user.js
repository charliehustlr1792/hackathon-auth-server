'use strict';
const bcrypt=require('bcrypt');
const {SALT}=require('../config/serverconfig')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true
      }
    },
    password:{
     type:DataTypes.STRING,
     allowNUll:false
  },
    mealCount:{ 
      type:DataTypes.INTEGER,
      defaultValue:0
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user)=>{
    const encryptedPassword=bcrypt.hashSync(user.password,SALT);
    user.password=encryptedPassword
  })
  return User;
};