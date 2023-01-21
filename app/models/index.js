const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://b68ec5f8aea53b:6f4d23b2@us-cdbr-east-06.cleardb.net/heroku_a26e4a307a3f41f?reconnect=true", {

logging: false
});
const mysql = require('mysql');
const pool = mysql.createPool({ 
  host: config.HOST,
  dialect: config.dialect,
  PORT: config.PORT,
  operatorsAliases: false,});

  config.DB,
  config.USER,
  config.PASSWORD,

  {
    host: config.HOST,
    dialect: config.dialect,
    PORT: config.PORT,
    operatorsAliases: false,

   /* pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }*/
  };

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

exports.scheduleTable = function(callback) {
  pool.getConnection(function(err, connection) {
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }
    var sql = "SELECT Name, Password FROM users";
    connection.query(sql, [], function(err, results) {
      connection.release(); // always put connection back in pool after last query
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }
      callback(false, results);
      res.render('dashboard', {data : results})
    });},
  )};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.js")(sequelize, Sequelize);
db.role = require("../models/role.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
