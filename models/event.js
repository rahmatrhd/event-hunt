'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    place: DataTypes.STRING,
    datetime: DataTypes.DATE,
    CategoryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  });

  Event.associate = models => {
    Event.belongsTo(models.Category)
    Event.belongsTo(models.UserId)
    Event.belongsToMany(models.User, {through: models.User_Event})
  }

  return Event;
};
