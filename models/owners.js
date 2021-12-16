'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Owners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Owners.belongsTo(models.Users, {foreignKey: "UserId"})
      Owners.belongsTo(models.Products, {foreignKey: "ProductId"})
    }
  };
  Owners.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Owners',
  });
  return Owners;
};