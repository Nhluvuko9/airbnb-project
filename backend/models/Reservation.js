const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema ({
    user: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    propertyName: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1 }

}, { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);