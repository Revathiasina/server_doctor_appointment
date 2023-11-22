const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const appointmentsSchema = new Schema({
    docId: {
        type: Number,
        required: true
    },
    apDate: {
        type: String,
        trim: true
    },
    apStartTime: {
        type: String,
        trim: true
    },
    apEndTime: {
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