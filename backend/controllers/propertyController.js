const Property = require('../models/Property');

// Create new property listing (POST)
const createProperty = async (req, res) => {
    try {
        console.log("incoming form layout data received:", req.body)

        const newProperty = await Property.create(req.body.propertyDetails);
        
        res.status(201).json({ 
            message: 'New listing created successfully!', 
            property: newProperty
        });
    } catch (error) {
        console.error('Property listing creation error:', error);
        res.status(400).json({ message: 'Error creating new property listing' })
    }
};

// Get all property listings from database (GET)
const getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        
        res.status(200).json(properties);
    } catch (error) {
        console.error('Get properties error:', error);
        res.status(500).json({ message: 'Error fetching property listing' })
    }

};

const getPropertiesById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        
        res.status(200).json(property);
    } catch (error) {
        console.error('Fetch property error:', error);
        res.status(500).json({ message: 'Server error fetching property listing' })
    }

};

// Update existing property listings (PUT)
const updateProperty = async (req, res) => {
    try {
        const { id } = req.params;

        const dataToUpdate = req.body.propertyDetails || req.body; 

        const updatedProperty = await Property.findByIdAndUpdate(id, dataToUpdate, { new: true, runValidators: true });
        
        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(201).json({ 
            message: 'Property updated successfully!', 
            property: updatedProperty
        });
    } catch (error) {
        console.error('Property update error:', error);
        res.status(400).json({ message: 'Error updating property listing' })
    }
};

// Delete an existing property listings (DELETE)
const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProperty = await Property.findByIdAndDelete(id);
        
        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found in database' });
        }

        res.status(200).json({ 
            message: 'Property deleted successfully!', 
            // property: deletedProperty
        });
    } catch (error) {
        console.error('Delete property error:', error);
        res.status(400).json({ message: 'Error deleting property listing' })
    }
};

module.exports = { createProperty, getProperties, getPropertiesById, updateProperty, deleteProperty };