const express = require('express');
const {register, login, logout } = require('../controller/userController')
const router = express.Router();

// implement register route
router.post('/', addUser);

// implement login route
router.post('/login', login);

// implement logout route
router.get('/logout', logout);

module.exports = router;
