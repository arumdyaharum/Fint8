'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsersDetails.belongsTo(models.Users, {foreignKey: "UserId"})
    }
  };
  UsersDetails.init({
    money: DataTypes.INTEGER,
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks : {
      beforeCreate: (instance, option) => {
        instance.money = 0;
      }
    },
    modelName: 'UsersDetails',
  });
  return UsersDetails;
};