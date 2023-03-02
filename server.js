const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require('path');
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./app/models");
const User = db.user;
const mysql = require('mysql');
const {scheduleTable} = require('./app/controllers/auth.controller');
//const connection = require("../cap-capstone/app/config");
const sequelize = new Sequelize("mysql://b68ec5f8aea53b:6f4d23b2@us-cdbr-east-06.cleardb.net/heroku_a26e4a307a3f41f?reconnect=true", {

logging: false
});

const app = express();
const ejs = require('ejs');
/*con = new mysql.createConnection({
  HOST: config.HOST,
  USER:config.USER,
  DIALECT: config.dialect,
  PASSWORD: config.PASSWORD,
  DB: config.DB,
  PORT: config.PORT,
  operatorsAliases: false,});

 */

 app.use(cors());
 app.enable('trust proxy');
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs')

//app.use('/controllers', require('./controllers/user.controller'));

app.use(
  cookieSession({
    name: "cap-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// database
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
 //db.sequelize.sync({force: true}).then(() => {
  // console.log('Drop and Resync Database with { force: true }');
   //initial();
 //});

// simple route
app.get("/", (req, res) => {
  res.render('login', {title: "Login"});
});

app.get("/signin")
// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.post('/forgetpass');
app.get( '/forgetpass', (req, res) =>{
  res.render('forgetpass.ejs');
});
app.post('/index');
app.get('/index', (req, res) =>{
  res.render('index.ejs');

});
app.post('/data');
app.get('/data', (req, res) =>{

  scheduleTable.username = username2;
  res.render('data.ejs', {username: username}, {password: password}, {username2: username2});
});



app.use(express.static(__dirname + '/views'));
/*
app.get('/dashboard', function(req, res){

    connection.query('SELECT * FROM users', function(err, result) {

        if(err){
            throw err;
        } else {
            res.render('dashboard.ejs', {obj : result}); 
            console.log(obj);               
        }
    });

});*/


/*function scheduleTable(req, res, next) 
 {
      db.query('SELECT * FROM users', function (err, result) {
          if(err) {
              console.log(err);
          } else {
            console.log(result);
            res.render('dashboard', {data : result})
          }
      });
  };*/
// set port, listen for requests

/*con.end(function(){
  console.log("The Connection has been closed")
});*/



const PORT = process.env.PORT || 43488;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});