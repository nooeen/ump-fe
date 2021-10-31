const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
var password = require('password-hash-and-salt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()

var myuser = [];
const tokenjson = {email: "nothing"};
//const tokenverify = "nothing";
class loginController {
    // [GET] /login
    index(req, res) {
        var email = "No user"
        
        User.find({})
            .then((users) => {
                if(req.session.User){
                    email = req.session.User.email
                } else if(typeof(req.cookies.token)!= 'undefined') {
                    console.log("clear cookies")
                    res.clearCookie('token')
                    res.redirect('/login');
                }
                res.render('login', {
                    email,
                    users: mutipleMongooseToObject(users)
                });
            })
            .catch(err => {res.send(err.message)})
    }

    //[GET] /studentList/
    studentList(req, res){
        User.find({})
        .then((users) => {
            res.render('studentList', {
                users: mutipleMongooseToObject(users)
            });
        })
        .catch(err => {res.send(err.message)})
    }


    // [POST] /login/verifyLogin
    loginCheck(req, res, next) {
        User.find({ email: req.body.email })
            .then((user) => {
                var hashPass = user[0].passwordHash;
                password(req.body.passwordHash).verifyAgainst(
                    hashPass,
                    function (error, verified) {
                        if (error) throw new Error('Something went wrong!');
                        if (!verified) {
                            console.log("Don't try! We got you!");
                            res.redirect('/login');
                        } else {
                            console.log('The secret is...');
                            req.session.User = {
                                email: user[0].email,
                                id: user[0]._id,
                            }
                            const tokenjson = jwt.sign({
                                email: user[0].email
                            }, process.env.TOKEN_KEY, {expiresIn : 60 * 60})
                            res.cookie('token', tokenjson)
                            res.redirect('/login')
                        }
                    },
                );
            })
            .catch( () => {res.redirect('/login')});
    }
    //[POST] /login/logout
    logoutUser(req, res, next) {
        req.session.destroy(function(err) {})
        res.clearCookie('token')
         res.redirect('/login');
    }

    // [POST] /register
    store(req, res, next) {
        password(req.body.passwordHash).hash(function (error, hash) {
            if (error) throw new Error('Something went wrong!');

            // Store hash (incl. algorithm, iterations, and salt)
            myuser.hash = hash;
            req.body.passwordHash = hash;
            const user = new User(req.body);
            user.save()
                .then(() => res.redirect('/login'))
                .catch((error) => {});
        });
    }
}

module.exports = new loginController();
