const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require('path');
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sequelize = new Sequelize("mysql://b68ec5f8aea53b:6f4d23b2@us-cdbr-east-06.cleardb.net/heroku_a26e4a307a3f41f?reconnect=true", {

logging: false
});
const app = express();

async function tableFunction () {
const  html = await ejs.forEach(view, obj, {async: true});
res.send(html);
}
tableFunction();
 app.use(cors());

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
const db = require("./app/models");
const Role = db.role;

sequelize.sync();
// force: true will drop the table if it already exists
 //db.sequelize.sync({force: true}).then(() => {
  // console.log('Drop and Resync Database with { force: true }');
   //initial();
 //});

// simple route
app.get("/*", (req, res) => {
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


var obj = {};
app.get('/dashboard', function(req, res) 
 {
      db.query('SELECT * FROM users', function (err, result) {
          if(err) {
              console.log(err);
          } else {
            obj = {print: result};
              res.render('dashboard.ejs', {
                title: 'Scheduling Table',
                  obj: obj
              });
              console.log(obj);
          }
      });
  });
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});