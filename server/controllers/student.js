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
                    class: users[i].class,
                    hasPaid: users[i].hasPaid
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
                _id: users[0]._id,
                username: users[0].username,
                fullname: users[0].fullname,
                dob: users[0].dob,
                history: users[0].history,
                class: users[0].class,
                hasPaid: users[0].hasPaid
            }
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(404).send('No student match the name')
        })
    }

    //calculate student GPA
    studentGpa(req, res) {
        User.find({class: req.query.class})
        .then( (users, err) => {
            if(err){
                res.status(500).send('Internal Server Error')
                return
            }
            for(let i = 0; i < users.length; i++) {
                let totalGPA = 0;
                let finalGPA = 0;
                let totalCredit = 0;
                for(let j = 0;j < users[i].history.credit.length;j++) {
                    totalCredit += users[i].history.credit[j];
                }
                for(let j = 0;j < users[i].history.gpa.length;j++) {
                    totalGPA += parseFloat(users[i].history.gpa[j] * users[i].history.credit[j]);
                    finalGPA = totalGPA / totalCredit;
                }
                users[i] = {
                    _id: users[i]._id,
                    username: users[i].username,
                    fullname: users[i].fullname,
                    GPA: finalGPA
                }
            }
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(404).json("No student in database")
        })
    }

    //calculate student TPA
    studentTpa(req, res) {
        User.find({class: req.query.class})
        .then( (users, err) => {
            if(err){
                res.status(500).send('Internal Server Error')
                return
            }
            for(let i = 0; i < users.length; i++) {
                let totalGPA = 0;
                let finalGPA = 0;
                for(let j = 0;j < users[i].history.tpa.length;j++) {
                    totalGPA += users[i].history.tpa[j];
                    finalGPA = totalGPA / (j + 1);
                }
                users[i] = {
                    _id: users[i]._id,
                    username: users[i].username,
                    fullname: users[i].fullname,
                    TPA: finalGPA
                }
            }
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(404).json("No student in database")
        })
    }


    //calculate student total credits
    studentCredit(req, res) {
        User.find({class: req.query.class})
        .then( (users, err) => {
            if(err){
                res.status(500).send('Internal Server Error')
                return
            }
            for(let i = 0; i < users.length; i++) {
                let totalCredit = 0;
                for(let j = 0;j < users[i].history.credit.length;j++) {
                    totalCredit += users[i].history.credit[j];
                }
                users[i] = {
                    _id: users[i]._id,
                    username: users[i].username,
                    fullname: users[i].fullname,
                    credit: totalCredit
                }
            }
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(404).json("No student in database")
        })
    }
}

module.exports = new studentController;