const mysql = require('mysql2');

module.exports = {
    development: {
        HOST: "ip-10-0-13-151",
        USER: "b68ec5f8aea53b",
        PASSWORD: "16f4d23b2",
        DB: "us-cdbr-east-06.cleardb.net",
        dialect: "mysql",
        PORT: "process.env.PORT || 8080",
        logging: false,
        },
    test: { 
        HOST: "ip-10-0-13-151",
        USER: "b68ec5f8aea53b",
        PASSWORD: "16f4d23b2",
        DB: "us-cdbr-east-06.cleardb.net",
        dialect: "mysql",
        PORT: "process.env.PORT || 8080",
        logging: false,
        },

    production: { 
        HOST: "ip-10-0-13-151",
        USER: "b68ec5f8aea53b",
        PASSWORD: "16f4d23b2",
        DB: "us-cdbr-east-06.cleardb.net",
        dialect: "mysql",
        PORT: "process.env.PORT || 8080",
        logging: false,
      }
  };

   const pool = function(){
    var mydb = mysql.createPool({
    HOST: "us-cdbr-east-06.cleardb.net",
    USER: "b68ec5f8aea53b",
  PASSWORD: "6f4d23b2",
  DB: "heroku_a26e4a307a3f41f",
  dialect: "mysql",
  PORT: "process.env.PORT || 43488",
  logging: false,
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
  connectionLimit: 15,
  queueLimit: 30,
  acquireTimeout: 1000000,
  connectTimeout: 30000
  }
    );
    return mydb;
};
const promisePool = function (){
  return pool().promise();
}

  module.exports = { connection: async () => promisePool().getConnection() };
