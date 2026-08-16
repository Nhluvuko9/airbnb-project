const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
const registerUser = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const role = req.body.role;
    
        // Checking if user already exists
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "Username already taken"});
        }

        // Password encryption
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({ username, password: hashedPassword, role: role || 'guest'});
        res.status(201).json({ 
            message: 'User successfully registered!', 
            user: {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role
            } 
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' })
    }
};
;

// Authenticating user
const loginUser = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
    
        // Finding user's username 
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password"});
        }

        // Comparing password with encrypted data
        const dataMatch = await bcrypt.compare(password, user.password);
        if (!dataMatch) {
            return res.status(400).json({ message: 'Invalid username or password' })
        }

        // JWT security token
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET
        )

        // User details and token confirmed and displayed
        res.status(200).json({ 
            message: 'Login was successful!',
            token, 
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            } 
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging user in' })
    }
};

module.exports = { registerUser, loginUser };