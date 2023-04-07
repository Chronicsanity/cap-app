const bcrypt = require('bcryptjs');
const db = require('models/index.js');
const express = require("express");
const app = express();
const User = db.user;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded())

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
async function getAll() {
    return await User.findAll();
}

async function getById(id) {
    return await getUser(id);
}
async function generateID(min, max) {
    return Math.floor(
        Math.random() *(max - min) + min
    )
}
async function create(req) {
    // validate
    if (await User.findOne({ where: { username: req.username } })) {
        throw 'Email "' + req.username + '" is already registered';
    }
    console.log(req.body.newName)
    console.log(req.body.newPassword)
    const user = new User(req);
    
    // hash password
    user.password = await bcrypt.hash(req.password, 10);
    user.id = await generateID(2, 10);
    console.log(user.id)
    if (await User.findOne({ where: {id: req.id} })) {
        await generateID(2, 20);
    };
    // save user
    await user.save();

}

app.post("/data");
app.get('/data', function (req,res) {
    const newUser = create(req);


    res.render('/data', {newUser : newUser})
});
module.exports = create(req);
async function update(id, params) {
    const user = await getUser(id);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}