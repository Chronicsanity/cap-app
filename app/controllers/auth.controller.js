const db = require("../models/index");
const authConfig = require("../config/auth.config.js");
const Sequelize = require("sequelize");
const User = db.user;
const Role = db.role;
const Jobs = db.jobs;
const Shift_Assignments = db.shift_assignments;
const WeekofShifts = db.weekofshifts;
const Op = db.Sequelize.Op;
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const app = express();
const bodyParser = require('body-parser');
const saltRounds = 8;
const flash = require('connect-flash');
const mysql = require('mysql');
const router = require('express').Router();
const {connection, pool} = require("../config/db.config.js");
const QueuedUser = db.queuedUsers;
const Employee = db.employee;
const session = require('express-session');
const alert = require('alert');
const path = ('path');
app.use(session({
  secret: authConfig,
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.set('view engine','ejs');


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
        
        res.status(500)({ message: error.message });
       }
      
       await user.save()
       
}


newUser();
const message =  req.flash('message', 'Thank you, please wait for your application to be accepted!')
res.locals.messages = req.flash();
res.render('index', {message:message});


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

      exports.employeeList = async function (res) {
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
          exports.jobList = async function (res) {
            return  new Promise(function(resolve, reject){
                db.sequelize.sync().then(() => {
              
              
                  Jobs.findAll().then(res => {
                  
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

              exports.weekTable = async function (res) {
                return  new Promise(function(resolve, reject){
                  db.sequelize.sync().then(() => {
                
                
                    WeekofShifts.findAll().then(res => {
                    
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
              exports.checkedList = async function (req) {
                const assigning = Shift_Assignments.DaysAssigned;
                if (req.body.MonAM) {
                  Shift_Assignments.DaysAssigned = "Mon AM"
                  console.log("True")
                }
                if (req.body.MonPM) {
                  Shift_Assignments.DaysAssigned = "Mon PM"
                  console.log("True")
                }
                if (req.body.TueAM) {
                  assigning.push("Tue AM")
                  console.log("True")
                }
                if (req.body.TuePM) {
                  assigning.push("Tue PM")
                  console.log("True")
                }
                if (req.body.WedAM) {
                  assigning.push("Wed AM")
                  console.log("True")
                }
                if (req.body.WedPM) {
                  assigning.push("Wed PM")
                  console.log("True")
                }
                if (req.body.ThuAM) {
                  assigning.push("Thu AM")
                  console.log("True")
                }
                if (req.body.ThuPM) {
                  assigning.push("Thu PM")
                  console.log("True")
                }
                if (req.body.FriAM) {
                  assigning.push("Fri AM")
                  console.log("True")
                }
                if (req.body.FriPM) {
                  assigning.push("Fri PM")
                  console.log("True")
                }
                if (req.body.SatAM) {
                  assigning.push("Sat AM")
                  console.log("True")
                }
                if (req.body.SatPM) {
                  assigning.push("Sat PM")
                  console.log("True")
                }
                if (req.body.SunAM) {
                  assigning.push("Sun AM")
                  console.log("True")
                }
                if (req.body.SunPM) {
                  assigning.push("Sun PM")
                  console.log("True")
                }
              }

              exports.assignmentsTable = async function (res) {
                const assigning = Shift_Assignments.DaysAssigned;
                return  new Promise(function(resolve, reject){
                  db.sequelize.sync().then(() => {
                
                
                    Shift_Assignments.findAll().then(res => {
                    
                   const object = res;
                    console.log(object)
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
  else if(user.role == 2) {
    return res.render('shiftmaker')
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
