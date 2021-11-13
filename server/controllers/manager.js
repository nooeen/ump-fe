require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

class managerController {
    managerList(req, res) {
        User.find({role: "manager"})
        .then( (users) => {
            for(let i =0; i < users.length; i++) {
                users[i] = {
                    username: users[i].username,
                    _id: users[i]._id
                }
            }
            res.json(users)
        })
    }
}

module.exports = new managerController;