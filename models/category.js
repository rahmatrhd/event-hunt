'use strict';
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    label: {
      type: DataTypes.STRING,
      unique: {
        msg: 'label udah ada cuy'
      }
    }
  });

  Category.associate = models => {
    Category.hasMany(models.Event)
    Category.belongsToMany(models.User, {through: models.Interest})
  }

  return Category;
};
