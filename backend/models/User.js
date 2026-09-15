const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required'],
        unique: true, 
        trim: true,
        minLength: [3, 'Username must be 3 or more characters long'],
    },
    password: {
        type: String,  
        required: [true, 'Password is required'], 
        minLength: [8, 'Password must be at least 8 characters long'],

    },
    role: { 
        type: String,
        enum: ['host', 'admin', 'guest'], 
        default: 'guest'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);