var userDb = require('../models/User');

//list all user with the role student
exports.list = (req, res) => {

}

//find the student with username or fullname=...
exports.find = (req, res) => {
    if(req.query.username) {
        const userName = req.query.username;
        userDb.findById(userName)
        .then(data => {
            if(!data){
                res.status(404).send({message: "Not found user with name " + userName})
            } else {
                res.send(data)
            }
        })
    } else {
    userDb.find()
        .then(user => {
            res.send(user)
        })
        .catch(error => {
            res.status(500).send({message: error.message || "error when retrieving"})
        })
    }
}


//calculate student's gpa


//calculate student's tpa


//calculate student's number of credits