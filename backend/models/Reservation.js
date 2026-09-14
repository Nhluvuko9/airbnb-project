const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema ({
    user: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    propertyName: { type: String, required: true },
    checkInDate: { type: Number, required: true },
    checkOutDate: { type: Number, required: true }

}, { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);