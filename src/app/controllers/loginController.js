const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
var password = require('password-hash-and-salt');

var myuser = [];
class loginController {
    // [GET] /login
    index(req, res) {
        let userQuerry = User.find({});
        var email = "No user"
        // console.log(email)
        console.log(req.session)
        if(req.session.User){
            console.log("check",req.session.User.email)
            email = req.session.User.email
        }
        Promise.all([userQuerry, User.countDocumentsDeleted()])
            .then(([users, deletedCount]) =>
                res.render('login', {
                    deletedCount,
                    users: mutipleMongooseToObject(users),
                    email
                }),
            )
            .catch();
    }


    // [POST] /login/verifyLogin
    loginCheck(req, res, next) {
        var hashPass;
        User.find({ email: req.body.email })
            .then((user) => {
                var hashPass = user[0].passwordHash;
                console.log(user);
                password(req.body.passwordHash).verifyAgainst(
                    hashPass,
                    function (error, verified) {
                        if (error) throw new Error('Something went wrong!');
                        if (!verified) {
                            console.log("Don't try! We got you!");
                            res.send('Login fail');
                        } else {
                            console.log('The secret is...');
                            req.session.User = {
                                email: user[0].email,
                                id: user[0]._id,

                            }
                            //res.send('Login successfully');
                            res.redirect('/login')
                        }
                    },
                );
            })
            .catch();
    }
    //[POST] /login/logout
    logoutUser(req, res, next) {
        req.session.destroy(function(err) {})
        
         res.redirect('/login');
    }

    // [POST] /register
    store(req, res, next) {
        password(req.body.passwordHash).hash(function (error, hash) {
            if (error) throw new Error('Something went wrong!');

            // Store hash (incl. algorithm, iterations, and salt)
            myuser.hash = hash;
            req.body.passwordHash = hash;
            console.log(hash);
            let userQuerry = User.find({});
            const user = new User(req.body);
            user.save()
                .then(() => res.redirect('/login'))
                .catch((error) => {});
        });
    }
}

module.exports = new loginController();
