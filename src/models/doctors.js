const mongoose = require('mongoose');

// Get the Schema constructor
let Schema = mongoose.Schema;

const doctorsSchema = new Schema({
    docId: {
        type: Number,
        required: true
    },
    docName: {
        type: String,
        trim: true
    },
    docType: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
    },
    startTime: {
        type: String, // 24hr format
        trim: true
    },
    endTime: {
        type: String, // 24hr format
        trim: true
    },
    location: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: Number,
        required: true,
        default: 1 // 1 - active, 0 - inactive
    },
}, {
    timestamps: true,
});

const DoctorsModel = mongoose.model('doctors', doctorsSchema);

module.exports = DoctorsModel;