const express = require('express');
const router = express.Router();
const { createReservation, getReservationByUser, getReservationByHost, deleteReservation } = require('../controllers/reservationController');
const { protect, authorize } = require('../middleware/auth');

// Create a reservation
router.post('/', protect, createReservation);

// Route mapping for fetching a Reservation (GET)
router.get('/user', protect, getReservationByUser);
router.get('/host', protect, authorize('host', 'admin'), getReservationByHost);

// Route mapping for deleting a Reservation (DELETE)
router.delete('/:id', protect, deleteReservation);

module.exports = router;