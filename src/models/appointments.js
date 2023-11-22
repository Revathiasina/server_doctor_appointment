const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const appointmentsSchema = new Schema({
    docId: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        trim: true
    },
    startTime: {
        type: String,
        trim: true
    },
    endTime: {
        type: String,
        trim: true
    },
    status: {
        type: Number,
        required: true,
        default: 1 // 1 - active, 0 - inactive
    },
}, {
    timestamps: true,
});

const appointmentsModel = mongoose.model('appointments', appointmentsSchema);

module.exports = appointmentsModel;