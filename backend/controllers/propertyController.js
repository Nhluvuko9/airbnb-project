const Property = require('../models/Property');

// Create new property listing
const createProperty = async (req, res) => {
    try {
        const newProperty = await Property.create(req.body);
        
        res.status(201).json({ 
            message: 'New listing created successfully!', 
            property: newProperty
        });
    } catch (error) {
        console.error('Property listing creation error:', error);
        res.status(400).json({ message: 'Error creating new property listing' })
    }
};

// Get all property listings from database
const getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        
        res.status(200).json(properties);
    } catch (error) {
        console.error('Get properties error:', error);
        res.status(500).json({ message: 'Error fetching property listing' })
    }
};

module.exports = { createProperty, getProperties };