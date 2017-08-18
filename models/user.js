'use strict';
const crypto = require('crypto')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    full_name: {
      type: DataTypes.STRING,
      allowNull: {
          args: false,
          msg: 'Nama tidak boleh kosong'
      }
    },
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
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Username udah kepake'
      },
      allowNull: {
          args: false,
          msg: 'Username tidak boleh kosong'
      }
    },
    password: DataTypes.STRING,
    salt: {
      type: DataTypes.STRING,
      unique: {
        msg: 'salt must be unique'
      }
    }
  });

  User.associate = models => {
    User.hasMany(models.Event, {as: 'myEvents'})
    User.belongsToMany(models.Event, {through: models.User_Event})
    User.belongsToMany(models.Category, {through: models.Interest})
    User.hasMany(models.Interest)
    User.hasMany(models.User_Event)
  }

  User.beforeCreate(model => {
    model.password = crypto.createHmac('sha256', model.salt).update(model.password).digest('hex');
  })

  return User;
};
