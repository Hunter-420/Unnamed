const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true // Optional field
    },
    src: {
        type: String,
        required: true // Optional field
    },
    avaibility: {
        type: String,
        enum: ['available', 'unavailable'], // Ensure enum values match dropdown options
        default: 'available' // Set default value if needed
      }
});

module.exports = mongoose.model('Product', productSchema);
