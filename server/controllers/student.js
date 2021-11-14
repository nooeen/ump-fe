require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

class studentController {

    // list all user with role student
    studentList(req, res) {
        User.find({role: "student"})
        .then( (users, err) => {
            if(err){
                res.status(500).send('Internal Server Error')
                return
            }
            for(let i = 0; i < users.length; i++) {
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

    // find student with username and fullname
    findStudent(req, res) {
        User.find({username: req.query.username, fullname: req.query.fullname})
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

    //calculate current Tpa
    studentTpa(req, res) {
        User.find({role: "student"})
        .then( (users, err) => {
            if(err){
                res.status(500).send('Internal Server Error')
                return
            }
            for(let i = 0; i < users.length; i++) {
                var currentGPA = users[i][history][3]['tpa'];
            }
            res.status(200).json(currentGPA)
        })
        .catch(() => {
            res.status(404).json("No student in database")
        })
    }
}

module.exports = new studentController;