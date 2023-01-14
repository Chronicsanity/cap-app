const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require('path');
const Sequelize = require("sequelize");
//const errorHandler = require('_middleware/error-handler');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sequelize = new Sequelize("mysql://b68ec5f8aea53b:6f4d23b2@us-cdbr-east-06.cleardb.net/heroku_a26e4a307a3f41f?reconnect=true", {

logging: false
});

const app = express();
const db = require("./app/models");


app.use (
  session ({
      key: "userId",
      secret: "Secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
          expires: 60 * 60 * 24,
      },
  })
);
app.get("/login", (req, res) => {
  res.render('login', {title: "Login"});
});
app.post('/register', (req, res)=> {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password,saltRound, (err, hash) => {
    if (err) {
             console.log(err)
         }
  db.execute(
    "INSERT INTO users (username, password) VALUES (?,?)"
    [username, password],
    (err, result)=> {
      console.log(err);
      }
  );
    }
  );})
  app.get("/", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else{
   
      res.redirect('/login');
      


    }
   
  });
app.use(cors(

 { origin: ["*"],
 methods: ["GET", "POST"],
 credentials: true,
 }
));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.execute(
    "SELECT * FROM users WHERE username = ?;",
    [username], 
    (err, result)=> {
        if (err) {
            res.send({err: err});
        }

        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              req.session.user = result;
              console.log(req.session.user);
            } else{
                res.send({message: "User doesn't exist!"}); 
            }
        });
            }
            else({message: "Wrong username/password combination!"});
        }
    
);});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/*app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs')

app.use('/controllers', require('./controllers/user.controller'));

app.use(errorHandler);
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
app.get("/", (req, res) => {
  res.render('login', {title: "Login"});
});

app.get("/")
// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});*/