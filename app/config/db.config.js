module.exports = {
    HOST: "Heroku",
    USER: "b68ec5f8aea53b",
    PASSWORD: "16f4d23b2",
    DB: "us-cdbr-east-06.cleardb.net",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };