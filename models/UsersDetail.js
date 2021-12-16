'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsersDetail.belongsTo(models.Users, {foreignKey: "UserId"})
    }
  };
  UsersDetail.init({
    money: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsersDetail',
  });
  return UsersDetail;
};