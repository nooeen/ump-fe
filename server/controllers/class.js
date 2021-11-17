require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

class classController {

    // api/class/list
    studentList(req, res) {
        User.find({class: req.query.class})
        .then( (users, err) => {
            if(err){
                res.status(500).send('Internal Server Error')
                return
            }
            if(users.length == 0){
                res.status(404).json("No student in class")
                return
            }
            for(let i =0; i < users.length; i++) {
                users[i] = {
                    username: users[i].username,
                    class: users[i].class,
                    fullname: users[i].fullname
                }
            }
            res.status(200).json(users)
        })
    }
}

module.exports = new classController();