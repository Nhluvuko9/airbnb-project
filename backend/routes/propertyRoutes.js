const express = require('express');
const router = express.Router();
const { createProperty, getProperties, getPropertiesById, updateProperty, deleteProperty } = require('../controllers/propertyController');
const { protect, authorize } = require('../middleware/auth');

// Route mapping for creating a property listing (POST)
router.post('/', protect, authorize('host', 'admin'), createProperty);

// Route mapping for fetching a property listing (GET)
router.get('/', getProperties);
router.get('/:id', getPropertiesById);

// Route mapping for updating a property listing (PUT)
router.put('/:id', protect, authorize('host', 'admin'), updateProperty);

// Route mapping for deleting a property listing (DELETE)
router.delete('/:id', protect, authorize('host', 'admin'), deleteProperty);

module.exports = router;
