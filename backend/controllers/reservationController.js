const Reservation = require('../models/Reservation');
const User = require('../models/User');

// CREATE a new reservation
const createReservation = async(req, res) => {
    try {
        const { checkInDate, checkOutDate, propertyName, guests } = req.body;

        if (!checkInDate || !checkOutDate || !propertyName || !guests) {
            return res.status(400).json({ message: 'Property, dates, and guests are required.' });
        }

        const guestCount = Number(guests);
        if (!Number.isInteger(guestCount) || guestCount < 1) {
            return res.status(400).json({ message: 'Guests must be a positive whole number.' });
        }

        const parsedCheckIn = new Date(checkInDate);
        const parsedCheckOut = new Date(checkOutDate);

        if (Number.isNaN(parsedCheckIn.getTime()) || Number.isNaN(parsedCheckOut.getTime())) {
            return res.status(400).json({ message: 'Invalid reservation dates.' });
        }

        if (parsedCheckOut <= parsedCheckIn) {
            return res.status(400).json({ message: 'Check-out must be after check-in.' });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }

        const newReservation = new Reservation({
            user: user._id,
            propertyName,
            checkInDate: parsedCheckIn,
            checkOutDate: parsedCheckOut,
            guests: guestCount
        });

        await newReservation.save();
        res.status(201).json({ message: 'Reservation created successfully!' });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET reservations by user
const getReservationByUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const reservations = await Reservation.find({ user: userId }).populate('user', 'username');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// GET reservations by host
const getReservationByHost = async (req, res) => {
    try {
        res.status(200).json({ message: 'Host Reservations' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE a reservation
const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedReservation = await Reservation.findOneAndDelete({
            _id: id,
            user: req.user.id
        });
        if (!deletedReservation) {
            return res.status(404).json({ message: 'Reservation not found.' });
        }
        
        res.status(200).json({ message: 'Reservation deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createReservation, getReservationByUser, getReservationByHost, deleteReservation };