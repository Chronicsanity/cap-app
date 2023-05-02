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
       await  Math.random() *(max - min) + min
      )
     
    }
console.log (generateID(1,100))
    return new Promise((resolve, reject) => {
    /*async function generateID(min, max) {
    

      const result = await Math.floor(
        Math.random() * (parseFloat(max) - parseFloat(min) + 1) + parseFloat(min)
      )
     // if (await User.findOne({ where: {id: req.id} })) {
     //   await generateID(2, 20);
 //  };
      return result;
    } */
    
      /*const user =  QueuedUser.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        id: generateID(2, 20)
        })
        
        
      
     
      const newUsername = [];
      const newPassword = [];
      const newEmail = [];
      const passwordConf = [];
      const newID = [];
        const makeNewUser = {
        username: newUsername.push(user.username),
        password: newPassword.push(user.password),
        passwordConf: passwordConf,
        email: newEmail.push(user.email),
        id: newID.push(user.id),
        "timestamps": false, 
        createdAt: false,
        updatedAt: false
        }
        console.log(makeNewUser);
      resolve(makeNewUser);
  
      })*/
async function newUser () {
      const user = await new QueuedUser(req);
      const newUsername = [];
      const newPassword = [];
   
      const newEmail = [];
     // const salt =  bcrypt.genSalt(10);
     newUsername.push(req.body.username)
     newPassword.push(req.body.password)
     newEmail.push(req.body.email)
     //const hashedPassword = bcrypt.hash(newPassword, salt);
      
        user.id = await generateID(2, 10);
        
        user.username=JSON.stringify(newUsername)
        user.email=JSON.stringify(newEmail)
        user.password=JSON.stringify(newPassword)
        
        console.log(user.id)
        if (await User.findOne({ where: {id: req.id} })) {
            await generateID(2, 20);
       };
}
    newUser(); 
    })
    
  }
      
    

  catch (error) {
    res.status(500).send({ message: error.message });
  }
  finally {
    
   
  
    console.log( "Added to Queue!")

}
}
  

exports.signin = async (req, res) => {

  try {
    const user = await User.findOne({ 
      where: {
      username: req.body.username,
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
  
finally {res.render('dashboard');}};


exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    return (err);
  }}
