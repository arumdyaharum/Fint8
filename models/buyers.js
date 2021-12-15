'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buyers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Buyers.belongsTo(models.Users, {foreignKey: "BuyerId"})
    }
  };
  Buyers.init({
    money: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    BuyerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Buyers',
  });
  return Buyers;
};