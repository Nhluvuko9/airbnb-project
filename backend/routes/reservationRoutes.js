const express = require('express');
const router = express.Router();
const { createReservation, getReservationByUser, getReservationByHost, deleteReservation } = require('../controllers/reservationController');

// Route for reservation (POST) 
router.post('/view-reservations', createReservation);

// Route mapping for fetching a Reservation (GET)
router.get('/user', getReservationByUser);
router.get('/host', getReservationByHost);

// Route mapping for deleting a Reservation (DELETE)
router.delete('/:id', deleteReservation);

module.exports = router;