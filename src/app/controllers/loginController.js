const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
var password = require('password-hash-and-salt');

var myuser = [];
class loginController {
    // [GET] /login
    index(req, res) {
        let userQuerry = User.find({});
        Promise.all([userQuerry, User.countDocumentsDeleted()])
            .then(([users, deletedCount]) =>
                res.render('login', {
                    deletedCount,
                    users: mutipleMongooseToObject(users),
                }),
            )
            .catch();
    }

    // [GET] /users/:slug
    show(req, res) {
        res.send('USERS TEST!!!');
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
                            res.send('Login successfully');
                        }
                    },
                );
            })
            .catch();
        // password(req.body.password).verifyAgainst(hashPass, function(error, verified) {
        //     if(error)
        //         throw new Error('Something went wrong!');
        //     if(!verified) {
        //         console.log("Don't try! We got you!");
        //     } else {
        //         console.log("The secret is...");
        //     }
        // });
        //res.send(hashPass)
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
        // Verifying a hash
        password('quanvo308').verifyAgainst(
            myuser.hash,
            function (error, verified) {
                if (error) throw new Error('Something went wrong!');
                if (!verified) {
                    console.log("Don't try! We got you!");
                } else {
                    console.log('The secret is...');
                }
            },
        );
    }
    // [GET] /User/store
    storeg(req, res) {
        res.send('USERS REGISTER TEST!!!');
    }
}

module.exports = new loginController();
