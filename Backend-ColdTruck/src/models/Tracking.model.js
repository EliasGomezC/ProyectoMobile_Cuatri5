const mongoose = require("mongoose");
const autoIncrementId = require("../plugins/autoIncrementId");

const TrackingSchema = new mongoose.Schema({
    _id: { type: Number, unique: true, required: true },
    type: {
        type: String,
        required: true,
        enum: ['Point'],
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        required: true,
        validate: {
        validator: arr =>
            Array.isArray(arr) &&
            arr.length === 2 &&
            arr.every(v => typeof v === 'number'),
            message: 'Coordinates must be [lng, lat] with numeric values'
        }
    },
    dateTime: { type: Date, default: Date.now },
    IDTrip: { type: Number, required: true, ref: 'trip' }
});
TrackingSchema.pre('save', autoIncrementId('Tracking'));

module.exports = mongoose.model("Tracking", TrackingSchema, 'tracking');
