const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

const {isAuth} = require('../middlewares/isAuth');

// đăng kí tài khoản
router.post('/register', userController.register);

// đăng nhập gửi jwt
router.post('/login', userController.login);

//setuser
router.get('/getuser', isAuth, userController.getuser);

module.exports = router;