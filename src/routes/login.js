const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/loginController');

router.get('/', loginController.index);
router.post('/register', loginController.store);
router.post('/verifyLogin', loginController.loginCheck);
module.exports = router;