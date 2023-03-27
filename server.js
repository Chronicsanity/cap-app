const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require('path');
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./app/models/index");
const User = db.user;
const mysql = require('mysql');
const Promise = require('promise');
//const  {scheduleTable}  = require('./app/controllers/auth.controller.js');
const sequelize = new Sequelize("mysql://b68ec5f8aea53b:6f4d23b2@us-cdbr-east-06.cleardb.net/heroku_a26e4a307a3f41f?reconnect=true", {
logging: false
});

const app = express();
const ejs = require('ejs');


 app.use(cors());
 app.enable('trust proxy');

app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs')



app.use(
  cookieSession({
    name: "cap-session",
    secret: "COOKIE_SECRET", 
    httpOnly: true,
    sameSite: 'strict'
  })
);


const Role = db.role;

db.sequelize.sync();

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



app.get('/data', async function (req, res) {
  
 
   function scheduleTable() {

    db.sequelize.sync().then(() => {
  
  
     User.findAll().then(res => {
      const result = JSON.stringify(res);
      //console.log(result)
    
     
      //return resolve (result)
  
     })
    }).then((res) => {
    console.log(res)
    return res;
  }).catch((error) => {
    console.error('Failed to retrieve data : ', error);
    
    
    
    }).catch((error) => {
    console.error('Unable to create table : ', error);
    })}

scheduleTable().then((result) => {

  console.log(result);
  res.render('data.ejs', {username: result})

});

  
  
})

    
app.use(express.static(__dirname + '/views'));



const PORT = process.env.PORT || 43488;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});