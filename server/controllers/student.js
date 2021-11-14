require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

class studentController {

    // list all user with role student
    studentList(req, res) {
        User.find({class: req.query.class})
        .then( (users, err) => {
            if(err){
                res.status(500).send('Internal Server Error')
                return
            }
            for(let i = 0; i < users.length; i++) {
                users[i] = {
                    _id: users[i]._id,
                    username: users[i].username,
                    fullname: users[i].fullname,
                    dob: users[i].dob,
                    history: users[i].history,
                    class: users[i].class
                }
            }
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(404).json("No student in database")
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
                _id: users[i]._id,
                username: users[i].username,
                fullname: users[i].fullname,
                dob: users[i].dob,
                history: users[i].history,
                class: users[i].class
            }
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(404).send('No student match the name')
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