const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name_cat: {
        type: String,
        require: true,
    },
    generate: {
        type: String,
        require: true,
    },
    sex: {
        type: String,
        require: true,
    },
    age: {
        type: String,
        require: true,
    },
    shipment: {
        type: String,
        require: true,
    },
    images: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cat', catSchema);