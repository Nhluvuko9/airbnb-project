import { useEffect, useState } from 'react';
import './ViewReservations.css';

export default function ViewReservations () {
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch reservations when page loads
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const token = localStorage.getItem('token');
                const feedback = await fetch('http://localhost:5000/api/reservations/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${token}`
                    },
                });

                const data = await feedback.json();

                if (!feedback.ok) {
                    throw new Error(data.message || 'Failed to create reservation');
                }

                setReservations(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReservations();
    }, []);

    // Handle deleting a reservation
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this reservation?"))
            return;

        try {
            const token = localStorage.getItem('token');
            const feedback = await fetch(`http://localhost:5000/api/reservations/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
            });

            const data = await feedback.json();

            if (!feedback.ok) {
                throw new Error(data.message || 'Failed to create reservation');
            }

            setReservations(prev => prev.filter(res => res._id !== id));
            alert('Reservation cancelled successfully!');
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="reservation-page"></div>;
    if (error) return <div className="reservation-page"><h2 style={{color: 'red'}}>Error: {error}</h2></div>

    return (
        <div className="reservation-page">
            <h2>My Reservations</h2>

            {reservations.length === 0 ? (
                <p>No reservations found</p>
            ) : (
                reservations.map((res) => (
                    <div key={res._id} className="reservation-list">
                        <div className="account-holder">
                            <h3>Booked by</h3>
                            <p>{res.user?.username}</p>
                        </div>
                        <div className="property-name">
                            <h3>Property name</h3>
                            <p>{res.propertyName}</p>
                        </div>
                        <div className="checkinDate">
                            <h3>Check-in Date</h3>
                            <p>{new Date(res.checkInDate).toLocaleDateString()}</p>
                        </div>
                        <div className="checkoutDate">
                            <h3>Check-out Date</h3>
                            <p>{new Date(res.checkOutDate).toLocaleDateString()}</p>
                        </div>
                        <div className="actions">
                            <h3>Actions</h3>
                            <button className='deleteres-btn' onClick={() => handleDelete(res._id)}>Delete</button>
                        </div>
                    </div>
                ))
            )}

        </div>
    )
}