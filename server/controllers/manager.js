require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

class managerController {

    // /api/manager/list
    managerList(req, res) {
        User.find({role: "manager"})
        .then( (users, err) => {
            if(err){
                res.status(500).send('Internal Server Error')
                return
            }
            for(let i =0; i < users.length; i++) {
                users[i] = {
                    username: users[i].username,
                    _id: users[i]._id
                }
            }
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(404).json("No manager in database")
        })
    }

    // api/manager/find?username=sth
    managerFind(req, res) {
        User.find({username: req.query.username})
        .then( (users, err) => {
            if(err){
                res.status(500).send('Internal Server Error')
                return
            }
            users[0] = {
                username: users[0].username,
                _id: users[0]._id
            }
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(404).send('No manager match the name')
        })
    }
}

module.exports = new managerController;