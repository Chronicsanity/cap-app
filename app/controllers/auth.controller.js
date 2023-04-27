const db = require("../models/index");
const authConfig = require("../config/auth.config");
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
const {connection, pool} = require("../config/db.config");
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
  
    {
      const user = await QueuedUser.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      
      });
      
     return user;
      }


    }
  
    
  catch (error) {
    res.status(500).send({ message: error.message });
  }
  finally {console.log("added to queue!")
  
res.redirect ('/')}
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
