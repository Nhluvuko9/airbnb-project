const Reservation = require('../models/Reservation');
const User = require('../models/User');

// CREATE a new reservation
const createReservation = async(req, res) => {
    try {
        const username = req.body.bookedBy;
        const checkInDate = req.body.checkInDate;
        const checkOutDate = req.body.checkOutDate;
        const propertyName = req.body.propertyName;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'User/Host not found.' })
        }

        const newReservation = new Reservation({
            user: user._id,
            propertyName,
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate)
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
        const { userId } = req.user._id;

        const reservations = await Reservation.find({ user: userId })
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
        
        const deletedProperty = await Reservation.findByIdAndDelete(id); 
        if (!deletedProperty) {
            return res.status(404).json({ message: 'Reservation not found.' });
        }
        
        res.status(200).json({ message: 'Reservation deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createReservation, getReservationByUser, getReservationByHost, deleteReservation };