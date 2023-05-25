const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require('path');
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const passport = require('passport');
const { verifySignUp } = require("./app/middleware");
const cookieParser = require("cookie-parser");
const db = require("./app/models/index.js");
const User = db.user;
const Employee = db.employee;
const QueuedUser = db.queuedUsers
const Time_Working = db.time_working;
const mysql = require('mysql');
const Promise = require('promise');
const bcrypt = require('bcryptjs');
const controller = require("./app/controllers/auth.controller.js");
const sequelize = new Sequelize("mysql://b68ec5f8aea53b:6f4d23b2@us-cdbr-east-06.cleardb.net/heroku_a26e4a307a3f41f?reconnect=true", {
logging: false
});

const app = express();
app.use(express.json());
const ejs = require('ejs');


 app.use(cors());
 app.enable('trust proxy');
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




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

db.sequelize.sync();

app.get("/", (req, res) => {
  res.render('login', {title: "Login"});
});

app.get("/signin")
// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.get( '/forgetpass', (req, res) =>{
  res.render('forgetpass.ejs');
});
app.post('/forgetpass', (req, res) => {
  if (req.body.password != req.body.confPassword) {
    return res.status(404).send({ message: "Passwords do not match."})
  }
  else if (req.body.email != User.email) {
    return res.status(404).send({ message: "No such email."})
  }
  else {
  
    if (req.body.email === User.email)
    {
      User.password = bcrypt.hashSync(req.body.password, 8);
    }
  }
  });
app.get('/index', async (req, res) =>{
res.render('index')
});
app.post('/', async function (req, res) {
const result = await controller.signup(req, res);

console.log(JSON.stringify(result));
  })



app.get('/data', async function (req, res) {
    async function scheduleTable() {
return  new Promise(function(resolve, reject){
    db.sequelize.sync().then(() => {
  
  
      Employee.findAll().then(res => {
      
     const object = res
      //console.log(object)
     return resolve (object);
      

      
       }) .catch((error) => {
    console.error('Failed to retrieve data : ', error);
    
    
    
    }).catch((error) => {
    console.error('Unable to create table : ', error);
      })
    })
    })
  } 
  

    scheduleTable().then(info => {
    //console.log(info)
    res.render('data.ejs', {user: info})
    
}) 
  
async function generateID(min, max) {
  return  Math.floor(
      Math.random() *(max - min) + min
  )
}
})
app.post('/data', (req, res) => {
//const submit = req.body.submit;

//if (submit === "newUser_button") {
  async function createEmployee(req) {
    // validate
   // if (await User.findOne({ where: { newUser: req.newUser } })) {
   //   throw 'Email "' + req.newName + '" is already registered';
  //}
  const user = await req.body.username
  /*const addEmployee = await User.findOne({
    ,
      where: {username: user}
      })
      if (addEmployee == null)
      {
       console.log("User not found!");
        return res.render('data')
      }*/
     // else {
     
      return console.log(user),
      await Employee.create( 
      {
        id: 0,
       user: user,
       job_title: req.body.job_title,
       date_working: req.body.date_working

      })
    //}
}
const newUser = createEmployee(req);

res.render('data')
})

app.get('/userQueue', async function (req, res) {

    
    
  

    controller.QueueTable(res).then(info => {
    //console.log(info)
    res.render('userQueue.ejs', {user: info})
    if (info.id == null) {
      res.render('userQueue.ejs', {user: " "})

    }
    }
    )})
app.post('/userQueue', async function (req, res) {
  req.body = JSON.parse(JSON.stringify(req.body));
 
if (await req.body.hasOwnProperty("accept")){


    

  
  console.log("User Accepted!")
  async function clone(){
  await controller.QueueTable().then(info => { 
    for (var i = 0; i < info.length; i++) {
      console.log(req.body.selectpicker)
      const newUser = info[1]
      const newRole = req.body.selectpicker
      User.upsert({
        id: newUser.id,
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        role: req.body.selectpicker
      })
     QueuedUser.destroy({

        where: {id: info[1].id }
    })
  
  
     
return res.render('userQueue',  {user:info})
  }})
  }
    
   await clone();

  
  
}

else if (await req.body.hasOwnProperty("deny")){
  console.log("Deny pressed")
  async function removeUser() {
  await controller.QueueTable().then(info => {
  for (var i = 0; i < info.length; i++) {
  QueuedUser.destroy({

    where: {id: info[1].id }
})
return res.render('userQueue', {user:info})
}
  
})

}
await removeUser();
}
})
app.get('/schedule', async function (req, res) {

    async function employeeTable() {
      return  new Promise(function(resolve, reject){
          db.sequelize.sync().then(() => {
        
        
            Employee.findAll().then(res => {
            
           const object = res
            //console.log(object)
           return resolve (object);
            
      
            
             }) .catch((error) => {
          console.error('Failed to retrieve data : ', error);
          
          
          
          }).catch((error) => {
          console.error('Unable to create table : ', error);
            })
          })
          })
        } 

    employeeTable().then(info => {
    //console.log(info)
    res.render('schedule.ejs', {user: info})
    
}) })
/*if (submit === "deleteUser") {
  async function _delete(req) {
  const user = await getUser(req.body.username)
  console.log (user)
  user.destroy();
console.log ("User has been removed.");
  }
_delete(req);
res.render('/data')
}
*/
app.use(express.static(__dirname + '/views'));



const PORT = process.env.PORT || 43488;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});