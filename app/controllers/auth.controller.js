const db = require("../models");
const authConfig = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Password = db.user.role;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


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
    
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
   else {
    const password = await User.findOne({
      where: {
        password: req.body.password,
      },
    });
    const passwordIsValid = bcrypt.compareSync(
      Password,
      password
      );
    
      

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }
  }
    
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400, // 24 hours
    });
  
    let authorities = [];
   

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
    });
  }
  catch (error) {
    return res.status(500).send({ message: error.message });
  }

};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};