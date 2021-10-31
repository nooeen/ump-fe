const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/loginController');
const jwtAuthentication = require('../app/controllers/middlewareController');

router.get('/', loginController.index);
router.get('/studentList', jwtAuthentication.authenToken, loginController.studentList);
router.post('/register', loginController.store);
router.post('/verifyLogin', loginController.loginCheck);
router.post('/logout', loginController.logoutUser);
module.exports = router;