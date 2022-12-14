const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require('path');
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://b68ec5f8aea53b:6f4d23b2@us-cdbr-east-06.cleardb.net/heroku_a26e4a307a3f41f?reconnect=true", {

logging: false
});

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs')

app.use(
  cookieSession({
    name: "cap-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// database
const db = require("./app/models");
const Role = db.role;

sequelize.sync();
// force: true will drop the table if it already exists
 //db.sequelize.sync({force: true}).then(() => {
  // console.log('Drop and Resync Database with { force: true }');
   //initial();
 //});

// simple route
app.get("/login", (req, res) => {
  res.render('login', {title: "Login"});
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}