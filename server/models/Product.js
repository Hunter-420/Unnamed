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
        required: false // Optional field
    },
    src: {
        type: String,
        required: false // Optional field
    }
});

module.exports = mongoose.model('Product', productSchema);
