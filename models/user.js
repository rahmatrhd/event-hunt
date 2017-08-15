'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    full_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email udah kepake'
      },
      validate: {
        isEmail: {
          msg: 'Email ga bener'
        }
      }
    }
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Username udah kepake'
      }
    }
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  });

  User.associate = models => {
    User.belongsToMany(models.Event, {through: models.User_Event})
    User.belongsToMany(models.Category, {through: models.Interest})
    User.hasMany(models.Event)
  }

  return User;
};
