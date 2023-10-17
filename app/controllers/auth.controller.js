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
     newRole.push (0)
    
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
                const checking = [];
                const blah = Shift_Assignments.id;

              
               
                if (req.body.MonAM) {
                  if (blah == null) { console.log("Monday created!")
                  Shift_Assignments.upsert({
                    DaysAssigned: "Mon AM"
                  })
                }
                  else {
                    
                  }
                }
                if (req.body.MonAM != true) {
            
                  Shift_Assignments.destroy({where: {DaysAssigned: "Mon AM"}})
                  }
                if (req.body.MonPM) {
                  if (blah == null) {
                  Shift_Assignments.upsert({
                    DaysAssigned: "Mon PM"
                  })
                }
                  console.log("True")
                }
                if (req.body.MonPM != true) {
            
                  Shift_Assignments.destroy({where: {DaysAssigned: "Mon PM"}})
                  }
                if (req.body.TueAM) {
                  Shift_Assignments.upsert({
                    DaysAssigned: "Tue AM"
                  })
                  console.log("True")
                }
                if (req.body.TueAM != true) {
            
                  Shift_Assignments.destroy({where: {DaysAssigned: "Tue AM"}})
                  }
                if (req.body.TuePM) {
                  Shift_Assignments.upsert({
                    DaysAssigned: "Tue PM"
                  })
                  console.log("True")
                }
                if (req.body.TuePM != true) {
            
                  Shift_Assignments.destroy({where: {DaysAssigned: "Tue PM"}})
                  }
                if (req.body.WedAM) {
                  Shift_Assignments.upsert({
                    DaysAssigned: "Wed AM"
                  })
                  console.log("True")
                }
                if (req.body.WedAM != true) {
            
                  Shift_Assignments.destroy({where: {DaysAssigned: "Wed AM"}})
                  }
                if (req.body.WedPM) {
                  Shift_Assignments.upsert({
                    DaysAssigned: "Wed PM"
                  })
                  console.log("True")
                }
                if (req.body.WedPM != true) {
            
                  Shift_Assignments.destroy({where: {DaysAssigned: "Wed PM"}})
                  }
                if (req.body.ThuAM) {
                  Shift_Assignments.upsert({
                    DaysAssigned: "Thu AM"
                  })
                  console.log("True")
                }
                if (req.body.ThuAM != true) {
            
                  Shift_Assignments.destroy({where: {DaysAssigned: "Thu AM"}})
                  }
                if (req.body.ThuPM) {
                  Shift_Assignments.upsert({
                    DaysAssigned: "Thu PM"
                  })
                  console.log("True")
                }
                if (req.body.ThuPM != true) {
            
                  Shift_Assignments.destroy({where: {DaysAssigned: "Thu PM"}})
                  }
                if (req.body.FriAM) {
                  Shift_Assignments.upsert({
                    DaysAssigned: "Fri AM"
                  })
                  console.log("True")
                }
                if (req.body.FriAM != true) {
            
                  Shift_Assignments.destroy({where: {DaysAssigned: "Fri AM"}})
                  }
                if (req.body.FriPM) {
                  Shift_Assignments.upsert({
                    DaysAssigned: "Fri PM"
                  })
                  console.log("True")
                }
                if (req.body.FriPM != true) {
            
                  Shift_Assignments.destroy({where: {DaysAssigned: "Fri PM"}})
                  }
                if (req.body.SatAM) {
                  Shift_Assignments.upsert({
                    DaysAssigned: "Sat AM"
                  })
                  console.log("True")
                }
                if (req.body.SatAM != true) {
            
                  Shift_Assignments.destroy({where: {DaysAssigned: "Sat AM"}})
                  }
                if (req.body.SatPM) {
                  Shift_Assignments.upsert({
                    DaysAssigned: "Sat PM"
                  })
                  console.log("True")
                }
                if (req.body.SatPM != true) {
            
                  Shift_Assignments.destroy({where: {DaysAssigned: "Sat PM"}})
                  }
                if (req.body.SunAM) {
                  Shift_Assignments.upsert({
                    DaysAssigned: "Sun AM"
                  })
                  console.log("True")
                }
                if (req.body.SunAM != true) {
            
                  Shift_Assignments.destroy({where: {DaysAssigned: "Sun AM"}})
                  }
                if (req.body.SunPM) {
                  Shift_Assignments.upsert({
                    DaysAssigned: "Sun PM"
                  })
                  console.log("True")
                }

                if (req.body.SunPM != true) {
            
                  Shift_Assignments.destroy({where: {DaysAssigned: "Sun PM"}})
                  }
              }
            
              
                
            
           
        
            
            

              exports.assignmentsTable = async function (res) {
                  if (Shift_Assignments.assignments == null) {
                return  new Promise(function(resolve, reject){
                  db.sequelize.sync().then(() => {
                
                
                    Shift_Assignments.findAll().then(res => {
                    
                   const object = res;
                   const shiftFix = Shift_Assignments.DaysAssigned;
              
                  
                   
                   
     
                   return resolve  (object);
                   
                  })
                  
                })
              }) 
            }}
              
              
              
              

            

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

    return res.render('weekshift')
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
