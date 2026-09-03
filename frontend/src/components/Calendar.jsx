import './Calendar.css';

export default function Calendar({ checkInDate, setCheckInDate, checkOutDate, setCheckOutDate, onClose }) {
    const emptyDays = 2; // Number of empty days before the first day of the month
    const daysInMonth = 30; // Number of days in the month

    const handleDateClick = (day) => {
        if (!checkInDate || (checkInDate && checkOutDate)) {
            setCheckInDate(day);
            setCheckOutDate(null);
        } else if (checkInDate && !checkOutDate) {
            if (day > checkInDate) {
                setCheckOutDate(day);
            } else {
                setCheckInDate(day);
            }
        }
    };  
    
    const calendarGrid = [
        // Empty days
        ...Array(emptyDays).fill(null), 
        // Days of the month
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1) 
    ];

    return (
        <div className="calendar-dropdown">
            <h3>September 2026</h3>
            <div className="calendar-weekdays">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <span key={day} className="calendar-weekday">
                        {day}
                    </span>
                ))}
            </div>

            <div className="calendar-layout">
               {calendarGrid.map((day,index) => {
                    if (day === null) return <div key={`empty-${index}`} className="empty-day"></div>;

                    const isCheckIn = day === checkInDate;
                    const isCheckOut = day === checkOutDate;
                    const isInRange = day > checkInDate && day < checkOutDate;

                    return (
                        <button 
                        key={`day-${day}`} 
                        type="button" 
                        onClick={() => handleDateClick(day)} 
                        className={`calendar-day ${isCheckIn ? 'check-in' : ''} ${isCheckOut ? 'check-out' : ''} ${isInRange ? 'in-range-highlight' : ''}`}>
                            {day}
                        </button>
                    );
               })}
            </div>
            {onClose && <button type="button" className="close-calendar" onClick={onClose}>Close</button>}
        </div>
    )
} 
