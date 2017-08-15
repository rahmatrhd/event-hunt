'use strict';
module.exports = function(sequelize, DataTypes) {
  var User_Event = sequelize.define('User_Event', {
    UserId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER,
    status: DataTypes.STRING
  });

  User_Event.associate = models => {
    User_Event.belongsTo(models.User)
    User_Event.belongsTo(models.Event)
  }

  return User_Event;
};
