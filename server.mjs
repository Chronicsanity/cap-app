import React, { useState, useEffect } from "react";
import calendar from "./app/models/calendar.js";
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
  const user = await JSON.stringify(req.body.employee_name).replace(/]|[[]/g, '');
  const addEmployee = await User.findOne({
    
      where: {username: user}
      })
      if (addEmployee == null)
      {
       console.log("User not found!");
        return scheduleTable().then(info => {
          //console.log(info)
          res.render('data.ejs', {user: info}
          )
        })
      }
     else {
     
      return console.log(user),
      await Employee.create( 
      {
        id: 0,
       user: user,
       job_title: req.body.job_title,
       date_working: req.body.date_working

      })
    }
}
const newUser = createEmployee(req);

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
    const info = scheduleTable()
      //console.log(info)
      res.render('data.ejs', {user: info})
      
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
app.get('/schedule', async (req, res) =>{
  
calendar();
  res.render ('schedule', {date: calendar()} )

})

app.use(express.static(__dirname + '/views'));



const PORT = process.env.PORT || 43488;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});