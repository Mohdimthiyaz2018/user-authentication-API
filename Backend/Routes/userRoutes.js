const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../Controllers/userController');
const isAuthenticated = require('../Middlewares/isAuthenticated');

const router = express.Router();

router.route('/user/registerUser').post(registerUser);
router.route('/user/loginUser').post(loginUser);
router.route('/user/logoutUser').get(logoutUser);
module.exports = router;  