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


var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a350af0d445da6",
    pass: "7a8a3f5d6cc02d"
  }
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
  
    {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      
      });
const message = {user: user.username, email: user.email, password:user.password}
      console.log("Sending email...")
      transporter.sendMail({from: "sandbox.smtp.mailtrap.io", to: 'cameron_harcum@hotmail.com', subject: 'Testing', text: JSON.stringify(message) })
      
      if (req.body.roles = 0) {
      res.send ({message : "User created! Please wait while admin sets your role."})
        
      }



    }
    
    if (req.body.roles) {
      const role = await role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = User.setRoles(role);
      if (result) res.send({ message: "User registered successfully!" });
    } else {
      // user has role = 1
      const result = user.setRoles([1]);
      if (result) res.send({ message: "User registered successfully!" });
    }
  }
  catch (error) {
    res.status(500).send({ message: error.message });
  }
  finally {console.log("email sent")}
};

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
