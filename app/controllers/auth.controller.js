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
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

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
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {

  try {
    const user = await User.findOne({ 
      where: {
      username: req.body.username,
      password: req.body.password
      }
    });

  if (!user) {
      return app.use(flash("User not found")),
        await new Promise(resolve => setTimeout(resolve, 5000)),
      res.redirect('login');
    }
   else if (app.get('/signin'), (req, res) => {
    comparePassword (user.password, db.password)
    return res.status(404).send({ message: "User Not found."}, 


   )});
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400, // 24 hours
    });
  
    let authorities = [];

    req.session.token = token;
    
  }
finally {res.render('dashboard');}};


module.exports = async function scheduleTable() {

  
  db.sequelize.sync().then(() => {

    User.findAll().then(res => {
    const result = res;
    const data = JSON.stringify(result);
    console.log(data)
    //console.log(result)
   
    return (result);
    }).catch((error) => {
    console.error('Failed to retrieve data : ', error);
    
    
    
    }).catch((error) => {
    console.error('Unable to create table : ', error);
    });
    
  })
  
}
  




exports.Test = function () {
  console.log("test!")
}

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    return (err);
  }}
