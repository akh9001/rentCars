const express = require('express');
const { addUser, login, refreshToken, logout, deleteUser, getAllUsers } = require('../controllers/userController');
const router = express.Router();
const { authentication, checkUserRole } = require('../middleware/authMiddleware');

// Define your middleware for admin and manager roles


// implement register route
router.post('/', addUser);

// implement login route
router.post('/login', login);

// Implement token refresh logic here to issue a new JWT token
router.post('/refresh-token', refreshToken)

// implement get all users route
router.get('/', authentication, checkUserRole(["admin"]), getAllUsers);

// implement delete user route

router.delete('/:id', deleteUser)

module.exports = router;
