const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
console.log("Port value is:", process.env.PORT);
console.log("URI exist?", process.env.MONGODB_URI? "Yes" : "NO");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));


app.get('/', (req, res) => {
  res.send('Server running smoothly!')
})

// Connecting to MongoDB 
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas!');
    })
    .catch ((error) => {
        console.error('Connection to MongoDB Atlas failed:', error);
    });

// Server starter
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});