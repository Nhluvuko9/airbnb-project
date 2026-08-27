const express = require('express');
const router = express.Router();
const { createProperty, getProperties } = require('../controllers/propertyController');

// Route mapping for creating a property listing (POST)
router.post('/', createProperty);

// Route mapping for fetching a property listing (GET)
router.get('/', getProperties);

module.exports = router;
