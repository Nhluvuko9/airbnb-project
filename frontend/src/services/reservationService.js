
const API_URL = 'https://airbnb-capstoneproject-backend.onrender.com';

export const createNewReservation = async ({ username, checkInDate, checkOutDate, propertyName, guests }) => {
    const token = localStorage.getItem('token');

    const reservationData = {
        username: username,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        propertyName,
        guests
    };

    try {
        const feedback = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(reservationData),
        });

        const responseText = await feedback.text();
        let data = null;

        if (responseText) {
            try {
                data = JSON.parse(responseText);
            } catch {
                data = { message: responseText };
            }
        }

        if (!feedback.ok) {
            throw new Error(data?.message || `Reservation failed (${feedback.status})`);
        }
        return data;

    } catch (error) {
        console.error("Error creating reservation:",error)
        throw error;
    }
};
