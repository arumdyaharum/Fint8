'use strict';
const {
  Model
} = require('sequelize');

const bcryptjs = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasOne(models.UsersDetails, {foreignKey: "UserId"})
      Users.hasMany(models.Products, {foreignKey: "UserId"})
      Users.belongsToMany(models.Products, {through: models.Owners})
    }
  };
  Users.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, option) => {
        const salt = bcryptjs.genSaltSync(10)
        instance.password = bcryptjs.hashSync(instance.password, salt)
      }
    },
    modelName: 'Users',
  });
  return Users;
};