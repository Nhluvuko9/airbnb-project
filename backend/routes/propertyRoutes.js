const express = require('express');
const router = express.Router();
const { createProperty, getProperties, getPropertiesById, updateProperty, deleteProperty } = require('../controllers/propertyController');

// Route mapping for creating a property listing (POST)
router.post('/', createProperty);

// Route mapping for fetching a property listing (GET)
router.get('/', getProperties);
router.get('/:id', getPropertiesById);

// Route mapping for updating a property listing (PUT)
router.put('/:id', updateProperty);

// Route mapping for deleting a property listing (DELETE)
router.delete('/:id', deleteProperty);

module.exports = router;
