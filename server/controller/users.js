const User = require("../models/user");

const getUsers = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error : ' + err))       
}


const addUser = (req, res) => {
    const username = req.body.username;

    const user = new User({username});

    user.save()
        .then(() => res.json("User added!"))
        .catch(err => res.status(400).json('Error : ' + err))
}

module.exports = {getUsers, addUser};