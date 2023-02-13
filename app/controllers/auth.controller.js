const db = require("../models");
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
const { Pool } = require('pg');
const { Router } = require("express");

/*con = new mysql.createConnection({
  HOST: config.HOST,
  USER:config.USER,
  DIALECT: config.dialect,
  PASSWORD: config.PASSWORD,
  DB: config.DB,
  PORT: config.PORT,
  operatorsAliases: false,});*/
//const connection = await mysql.getConnection;

//const schedule = require ("../models").scheduleTable;

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
    
    /*async function scheduleTable()
    {
     // var sql = "SELECT username, password FROM users";
     //app.get('/dashboard', function (req, res, next)  {

     const data = {users:data};
    
      User.findAll({
        attributes: ['username', 'password'],
        limit: 10
      }).then(users => {
        console.log(users);
        res.render({users:data});
      }).catch(function(err) {
        console.log (err);
      });
   // });
      
    };
*/
    /*var sql = "SELECT Name, Password FROM users";
    var pool = await new Pool(config);
    connection = config;
      /*pool.getConnection(function(err, connection){
      if (err) {
        connection.release();
       throw err;
      }
    
    },
      
    
     pool.query(sql, function(err, result) {
      
      if(err) { 
        console.log(err); 
        return;
      }
      else {

        if (result <= null) {
          connection.release();
        return; 
      
        }
        else  {
          connection.release();
         callback({result});
        }
    }
   console.log(result + JSON.stringify(result));
      connection.release();

      return (res.render ('dashboard', result))
    
    });*/
  
res.render('dashboard');

app.get('/dashboard', (res, req) => {
  //var sql = "SELECT * FROM users";
 // mysql_connection.query(sql,function(err,result){
    if (err) {throw err}
    else {
      res.message ("Button pressed!")
      //console.log(result.length)
    }})}//)
 // }




/*function results() {
  var sql = "SELECT username, password FROM users";
  db.query(sql, function(err, result) {
 if (err) {
 
     var message = err.message;
     console.log(message)
     return res.status(500).send(message);
 }
 else {
 JSON.parse(result);
 return result;
 
 }
 
 
  })
 }
*/
   catch (error) {
     return res.status(500).send({ message: error.message });
   }
 
  }




/*  var sql = "SELECT username, password FROM users";
 db.query(sql, function(err, result) {
if (err) {

    var message = err.message;
    console.log(message)
    return res.status(500).send(message);
}
else {
JSON.parse(result);
res.render('dashboard', {data: result});

}


 })
})
 */


exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    return (err);
  }}