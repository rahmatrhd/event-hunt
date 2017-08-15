'use strict';
module.exports = function(sequelize, DataTypes) {
  var Interest = sequelize.define('Interest', {
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  });

  Interest.associate = models => {
    Interest.belongsTo(models.User)
    Interest.belongsTo(models.Category)
  }

  return Interest;
};
