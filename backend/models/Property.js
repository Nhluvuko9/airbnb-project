const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    imageURL: { type: String, default: 'https://placehold.co/600x400?text=No+image'},
    type: { type: String, required: [true, 'Type of accomodation is required'] },
    location: { type: String, required: [true, 'Location is required'] },
    guests: { type: Number, required: [true, ' Max number of guests is required'] },
    bedrooms: { type: Number, required: [true, 'Number of bedrooms is required'] },
    bathrooms: { type: Number, required: [true, 'Number of bathrooms is required'] },
    amenities: { type: [String], default: [] },
    price: { type: Number, required: [true, 'Price per night is required'] },
    title: { type: String, required: [true, 'Title is required'], trim: true},
    weeklyDiscount: { type: Number, default: 0 },
    cleaningFee: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 },
    occupancyTaxes: { type: Number, default: 0 },
    description: { type: String, required: [true, 'Description is required'] },
}, {
    timestamps: true
}); 

module.exports = mongoose.model('Property', propertySchema);