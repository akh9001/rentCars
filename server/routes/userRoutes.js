const express = require('express');
const { addUser, login, refreshToken, logout } = require('../controllers/userController');
const { deleteUser } = require('../controllers/userController')
const router = express.Router();

// implement register route
router.post('/', addUser);

// implement login route
router.post('/login', login);

// implement logout route
router.post('/logout', logout);

// Implement token refresh logic here to issue a new JWT token
router.post('/refresh-token', refreshToken)

router.delete('/:id', deleteUser)

module.exports = router;
