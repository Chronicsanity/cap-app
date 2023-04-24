const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require('path');
const verifyRole = require("./app/middleware/verifySignUp");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./app/models/index");
const User = db.user;
const mysql = require('mysql');
const Promise = require('promise');
const bcrypt = require('bcryptjs');
const controller = require("./app/controllers/auth.controller.js");
const sequelize = new Sequelize("mysql://b68ec5f8aea53b:6f4d23b2@us-cdbr-east-06.cleardb.net/heroku_a26e4a307a3f41f?reconnect=true", {
logging: false
});

const app = express();
const ejs = require('ejs');


 app.use(cors());
 app.enable('trust proxy');
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());


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


const Role = db.role;

db.sequelize.sync();

app.get("/", (req, res) => {
  res.render('login', {title: "Login"});
});

app.get("/signin")
// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.get( '/forgetpass', (req, res) =>{
  res.render('forgetpass.ejs');
});
app.post('/forgetpass', (req,res) => {
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
app.get('/index', (req, res) =>{
res.render('index')
});
app.post('/', (req, res) => {
controller.signup(req,res);
})



app.get('/data', async function (req, res) {
  
 verifyRole.checkRolesExisted(req, res, next);
  console.log(result);
  if (User.roles === 1 || User.roles === 0) {
    res.redirect('login')
  }
 else {
    async function scheduleTable() {
return promise = new Promise(function(resolve, reject){
    db.sequelize.sync().then(() => {
  
  
      User.findAll().then(res => {
      
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
    
}) }

async function generateID(min, max) {
  return Math.floor(
      Math.random() *(max - min) + min
  )
}

app.post('/data', (req, res) => {
//const submit = req.body.submit;

//if (submit === "newUser_button") {
  async function create(req) {
    // validate
   // if (await User.findOne({ where: { newUser: req.newUser } })) {
   //   throw 'Email "' + req.newName + '" is already registered';
  //}
  console.log(req)
  const user = new User(req);
  const newUsername = [];
  const newPassword = [];
  const newRole = [];
  const newEmail = [];
  const salt = await bcrypt.genSalt(10);
  newUsername.push(req.body.username)
 //user.username = await req.body.name;
 //user.password = await req.body.pass;
 newPassword.push(req.body.password)
 newEmail.push(req.body.email)
 newRole.push(req.body.role)
 //const hashedPassword = bcrypt.hash(newPassword, salt);
  
    user.id = await generateID(2, 10);
    
    user.username=JSON.stringify(newUsername)
    user.email=JSON.stringify(newEmail)
    user.role=JSON.stringify(newRole)
    user.password=JSON.stringify(newPassword)
    
    console.log(user.id)
    if (await User.findOne({ where: {id: req.id} })) {
        await generateID(2, 20);
   };
    // save user
    await user.save();
  }
  
const newUser = create(req);

res.render('/data', {newUser : newUser})

/*if (submit === "deleteUser") {
  async function _delete(req) {
  const user = await getUser(req.body.username)
  console.log (user)
  user.destroy();
console.log ("User has been removed.");
  }
_delete(req);
res.render('/data')

}*/
})
})
app.use(express.static(__dirname + '/views'));



const PORT = process.env.PORT || 43488;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});