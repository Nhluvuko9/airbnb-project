// MAIN RUNTIME ENGINE //
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize environmental (.env) variables
dotenv.config();
console.log("Port value is:", process.env.PORT);
console.log("URI exist?", process.env.MONGODB_URI? "Yes" : "NO");

const app = express();

//Security Middleware
app.use(cors());
app.use(express.json());
// File static images saved in local directory
app.use('/uploads', express.static('uploads'));
// Central routing maps
app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));

app.get('/', (req, res) => {
  res.send('Server running smoothly!')
})

// DATABASE LAYER HOOK
// Connecting to MongoDB 
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not configured');
    }
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas!');

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error('Server startup failed:', error.message);
    process.exit(1);
});