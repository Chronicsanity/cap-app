import react, { useState, useEffect } from "react";
import App from "./app/models/calendar.js";
import express from "express";
import session from "express-session";
import cors from "cors";
import cookieSession from "cookie-session";
import path from 'path';
import Sequelize from "sequelize";
import bodyParser from "body-parser";
import db from "./app/models/index.js";
import {fileURLToPath} from 'url';
const User = db.user;
const Employee = db.employee;
const QueuedUser = db.queuedUsers;
import mysql from 'mysql';
import Promise from 'promise';
import bcrypt from 'bcryptjs';
import controller from "./app/controllers/auth.controller.js";
const sequelize = new Sequelize("mysql://b68ec5f8aea53b:6f4d23b2@us-cdbr-east-06.cleardb.net/heroku_a26e4a307a3f41f?reconnect=true", {
logging: false
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
import ejs from 'ejs';


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
import authRoute from './app/routes/auth.routes.js';
import userRoute from'./app/routes/user.routes.js';
authRoute(app);
userRoute(app);
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
   
  

    controller.scheduleTable().then(info => {
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

req.body = JSON.parse(JSON.stringify(req.body));

if (req.body.hasOwnProperty("acceptEmployee")) {
  async function createEmployee(req) {
   
  const user = JSON.stringify(req.body.employee_name).replace(/]|[[]/g, '');

  const editEmployee = await Employee.findOne({attributes: ['user']}, {where: {user: user}}).then(result => {
    
    return JSON.stringify(result).split("[\\[\\]]")
  })
  
  
  


     if (user == null || user =='""')
      {
       console.log("User not found!");
        return controller.scheduleTable().then(info => {
          //console.log(info)
          res.render('data', {user: info}
  
          )
        })
      }
     
        
     else {

      if ( Employee.findOne({attributes: ['user']}, {where: {user: user}}).then(result => {
        if (result != user)  return  
        
      
        console.log("CHECK")
        Employee.update({
        job_title: req.body.job_title},
      
      {where: {user:user}
      })
     
    }))
  

return console.log(req.body.employee_name + user + editEmployee), await Employee.create( 
  {
    id: 0,
   user: user,
   job_title: req.body.job_title,
   date_working: req.body.date_working
  
  })


}}
const newUser = createEmployee(req);

if (newUser.job_title == "chef" || Employee.job_title == "sous chef" || Employee.job_title == "bus boy"  || Employee.job_title == "waiter" ) {

controller.scheduleTable().then(info => {
  //console.log(info)
  res.redirect('data', {user: info}
  )
})
}
else {
return res.redirect('data')

}
    const schedule = controller.scheduleTable();
      //console.log(info)
      res.render('data.ejs', {user: schedule})
      
  } 
  if(req.body.hasOwnProperty("rejectEmployee")) 
  { 
    

    async function remove(req) {
      const removeUser = await JSON.stringify(req.body.remove_Employee).replace(/]|[[]/g, '');
      const userRemoved = await  Employee.findOne({where: {user: removeUser}})
   
     await Employee.destroy({
    
        where: {user: removeUser }
    })
  
      
    
}

    
   remove(req);

   controller.scheduleTable().then(info => {
    //console.log(info)
    res.render('data', {user: info}
    )
  })
  }
      
  else {
  return controller.scheduleTable().then(info => {
    //console.log(info)
   return res.render('data', {user: info}
    )
  })
  
  }
  
    })

app.get('/userQueue', async function (req, res) {

    
    
  

    controller.QueueTable(res).then(info => {
    //console.log(info)
    res.render('userQueue.ejs', {user: info})
    if (info.id == null) {
      res.render('userQueue.ejs', {user: "---"})

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
app.get('/schedule', async (req, res) =>{
const scheduleInfo = App;
  res.render ('schedule', {date: scheduleInfo})

})

app.use(express.static(__dirname + '/views'));



const PORT = process.env.PORT || 43488;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});