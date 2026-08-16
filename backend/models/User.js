const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required'],
        unique: true, 
        minLength: [3, 'Username must be at least 3 letters long'],
    },
    password: {
        type: String,  
        required: [true, 'Password is required'],
        unique: true, 
        minLength: [8, 'Password must be at least 8 characters long'],

    },
    role: { 
        type: String,
        enum: ['host', 'admin', 'guest'], 
        default: 'guest'
    }
});

module.export = mongoose.model('User', userSchema);