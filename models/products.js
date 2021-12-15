'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.belongsTo(models.Users, {foreignKey: "VendorId"})
      Products.belongsToMany(models.Users, {through: models.Owners})
    }
  };
  Products.init({
    name: DataTypes.STRING,
    price_return: DataTypes.DECIMAL,
    risk: DataTypes.DECIMAL,
    price: DataTypes.INTEGER,
    VendorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};