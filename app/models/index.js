const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://b68ec5f8aea53b:6f4d23b2@us-cdbr-east-06.cleardb.net/heroku_a26e4a307a3f41f?reconnect=true", {

logging: false,
timestamps: false

});
const mysql = require('mysql');


  config.DB,
  config.USER,
  config.PASSWORD,


  'use strict'

  class NoTimestamp {
    register (Model) {
      Object.defineProperties(Model, {
        usernameColumn: {
          get: () => null,
        },
        passwordColumn: {
          get: () => null,
        },
        rolesColumn: {
          get: () => null,
        },
      })
    }
  }
  
  module.exports = NoTimestamp

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.js")(sequelize, Sequelize);
db.role = require("../models/role.js")(sequelize, Sequelize);
db.employee = require('../models/employee.js')(sequelize, Sequelize);
db.queuedUsers = require('../models/queuedUsers.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",

});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",

});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;