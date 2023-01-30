const mysql = require('mysql');
/*var pool  = mysql.createPool({
HOST: "ip-10-0-13-151",
USER: "b68ec5f8aea53b",
PASSWORD: "16f4d23b2",
DB: "us-cdbr-east-06.cleardb.net",
dialect: "mysql",
PORT: "process.env.PORT || 8080",
logging: false,
max: 5,
min: 0,
acquire: 30000,
idle: 10000
});
module.exports = {pool};*/
module.exports = {
    development: {
        HOST: "ip-10-0-13-151",
        USER: "b68ec5f8aea53b",
        PASSWORD: "16f4d23b2",
        DB: "us-cdbr-east-06.cleardb.net",
        dialect: "mysql",
        PORT: "8889",
        logging: false,
        },
    test: { 
        HOST: "ip-10-0-13-151",
        USER: "b68ec5f8aea53b",
        PASSWORD: "16f4d23b2",
        DB: "us-cdbr-east-06.cleardb.net",
        dialect: "mysql",
        PORT: "8889",
        logging: false,
        },

    production: { 
        HOST: "ip-10-0-13-151",
        USER: "b68ec5f8aea53b",
        PASSWORD: "16f4d23b2",
        DB: "us-cdbr-east-06.cleardb.net",
        dialect: "mysql",
        PORT: "8889",
        logging: false,
      },
    /*pool: {
        HOST: "ip-10-0-13-151",
        USER: "b68ec5f8aea53b",
        PASSWORD: "16f4d23b2",
        DB: "us-cdbr-east-06.cleardb.net",
        dialect: "mysql",
        PORT: "process.env.PORT || 8080",
        logging: false,
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }*/
  };