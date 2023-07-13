const db = require("../models/index");
const authConfig = require("../config/auth.config.js");
const Sequelize = require("sequelize");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const app = express();
const bodyParser = require('body-parser');
const saltRounds = 8;
const flash = require('express-flash');
const mysql = require('mysql');
const router = require('express').Router();
const {connection, pool} = require("../config/db.config.js");
const nodemailer = require('nodemailer');
const QueuedUser = db.queuedUsers;
const Employee = db.employee;
const popup = require('popups')

app.set('view engine','ejs');


let windowsToasterNotifier = new WindowsToaster({
  withFallback: true
});

async function hashPassword(password) 
  {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash)
  } 
  app.use(bodyParser.urlencoded({ extended: true }));

async function comparePassword(password, hash)
   {
    const result = await bcrypt.compare(password, hash);
    return result;
  }



exports.signup = async (req, res) => {
  // Save User to Database
  try {
    async function generateID(min, max) {
      return Math.floor(
         Math.random() *(max - min) + min
      )
     
    }
    return new Promise((resolve, reject) => {
 
async function newUser () {
      const user = await new QueuedUser(req);
      const newUsername = [];
      const newPassword = [];
      const newEmail = [];
      const newRole = [];
     // const salt =  bcrypt.genSalt(10);
    
     newUsername.push(req.body.username),
     newPassword.push(req.body.password),
     newEmail.push(req.body.email)
     newRole.push (req.body.selectpicker)
    
    user.username= await JSON.stringify(newUsername).replace(/]|[[]/g, '')
    user.email= await JSON.stringify(newEmail).replace(/]|[[]/g, '')
    user.password= await JSON.stringify(newPassword).replace(/]|[[]/g, '')
    user.role= await JSON.stringify(newRole).replace(/]|[[]/g, '')
    
     //const hashedPassword = bcrypt.hash(newPassword, salt);
     
        user.id = await generateID(2, 100);
    
        if (await QueuedUser.findOne({ where: {id: user.id}})) {
          
            user.id = await generateID(10,100);
       };

       if (await QueuedUser.findOne({where: {username: user.username}})) {
        
        res.status(500).send({ message: error.message });
       }
      

   

       await user.save(),
       windowsToasterNotifier.notify({
        title: "Windows Toaster Notification",
        message: "This is a notification sent from the Windows Toaster Notifier",
        sound: "SMS",
      },
      function (error, response) {
        console.log(response);
      })
      console.log("Check")
}
newUser();
console.log("Check 2"),
windowsToasterNotifier.notify({
  title: "Windows Toaster Notification",
  message: "This is a notification sent from the Windows Toaster Notifier",
  sound: "SMS",
},
function (error, response) {
  console.log(response);
})

res.render('index')
})
    
  }
      
  catch (error) {
    res.status(500).send({ message: error.message });
  }
}
exports.scheduleTable = async function (res) {
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
  exports.QueueTable = async function (res) {
    return  new Promise(function(resolve, reject){
        db.sequelize.sync().then(() => {
      
      
          QueuedUser.findAll().then(res => {
          
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

exports.signin = async (req, res) => {

  try {
   const userString = JSON.stringify(req.body.username).replace(/]|[[]/g, '');
    const user = await User.findOne({ 
      where: { 
        username: userString
      }
    });
    const userPass = await req.body.password;
    const savedPass = await user.password;

  if (!user) {
      return app.use(flash("User not found")),
        await new Promise(resolve => setTimeout(resolve, 5000)),
      res.render('login');
    }
   else if (bcrypt.compare(userPass, savedPass) === false)
   {
    return res.render('login');
    };
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400, // 24 hours
    });
  
    let authorities = [];

    req.session.token = token;
  }
  
finally {
  const userString = JSON.stringify(req.body.username).replace(/]|[[]/g, ' ');
  const user = await User.findOne({ 
    where: {
    username: userString,
    }})
    if (user == null){
      console.log(user)
      return res.render ('index')
    }
 else if (user.role == 1) {

  res.render('dashboard');}
  else if(user.role == 3) {
    return res.render('schedule')
  }
  else if (user.role == 0) {
   return res.render('login')
  }
};}


exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    return (err);
  }}
