// const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
// const { mongooseToObject } = require('../util/mongoose');

class UserController {
    // [GET] /dev/user
    show(req, res, next) {
        User.findOne({ username: req.query.username})
            .then((user) =>
                res.json(user)
            ).catch(next);
    }

    // [GET] dev/students/create
    createStudent(req, res, next) {
        res.render('students/create');
    }
    
    createTeacher(req,res, next) {
        res.render('teachers/create');
    }

    // [POST] /dev/students/store
    store(req, res, next) {
        if (req.body.role == 'student'){
            const student = new Student(req.body);
            if (req.body.hasPaid){
                student.hasPaid = true;
            } else {
                student.hasPaid = false;
            }
        console.log(typeof(req.body.dob));
            student
                .save()
                .then(() => res.redirect('students/create'))
                .catch((error) => {});
        } else if (req.body.role == 'teacher'){
            const teacher = new Teacher(req.body);
            teacher
                .save()
                .then(() => res.redirect('teachers/create'))
                .catch((error) => {});
        }
    }

}

module.exports = new UserController();