const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/loginController');

router.get('/', loginController.index);
router.post('/register', loginController.store);
router.post('/verifyLogin', loginController.loginCheck);
router.post('/logout', loginController.logoutUser);
module.exports = router;