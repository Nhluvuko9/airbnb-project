const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Route for registration and login: POST 
router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;