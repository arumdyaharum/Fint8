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
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsersDetails',
  });
  return UsersDetails;
};