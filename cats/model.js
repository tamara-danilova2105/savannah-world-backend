const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name_cat: {
        type: String,
        required: true,
    },
    generate: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    shipment: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cat', catSchema);