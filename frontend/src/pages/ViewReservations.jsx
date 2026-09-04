import './ViewReservations.css';

export default function ViewReservations () {
    return (
        <div className="reservation-page">
            <h2>My Reservations</h2>
            <div className="reservation-list">
                <div className="account-holder">
                    <p>Booked by</p>
                </div>
                <div className="property-name">
                    <p>Property name</p>
                </div>
                <div className="checkinDate">
                    <p>Check-in Date</p>
                </div>
                <div className="checkoutDate">
                    <p>Check-out Date</p>
                </div>
                <div className="actions">
                    <p>Actions</p>
                </div>
            </div>
        </div>
    )
}