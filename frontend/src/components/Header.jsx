import { authService } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Calendar from '../components/Calendar';
import './Header.css';

export default function Header({ theme } ) {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState(() => authService.getCurrentUser());
    const dropdownRef = useRef(null);
    const guestOptionsRef = useRef(null);

    // Handle user loging out
    const handleLogout = () => {
        authService.logout();
        setUser(null);
        setShowDropdown(false);
        navigate('/login');
    };

    const [location] = useState("");

    // Location city selector
    const handleLocation = (e) => {
        const selectedLocation = e.target.value;
        if (selectedLocation === 'select') return;
        navigate(`/locations?city=${encodeURIComponent(selectedLocation)}`);
    }

    // Calendar state variables
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    // Guest count state variables
    const [isOpen, setIsOpen] = useState("");
    const [guestCount, setGuestCount] = useState({
        adults: 0,
        children: 0
    });

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (guestOptionsRef.current && !guestOptionsRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const updateCount = (type, action) => {
        setGuestCount((currentGuests) => ({
            ...currentGuests,
            [type]: Math.max(0, currentGuests[type] + (action === "plus" ? 1 : -1))
        }));
    };

    // Guest count
    const totalGuests = guestCount.adults + guestCount.children;

    // Header LIGHT or DARK theme
    const headerBgColor = theme === "light" ? "white" : "black";

    console.log("Header read user data", user)
    console.log("Header user data", authService.getCurrentUser());

    return (
        <div className="header-container" style={{backgroundColor: headerBgColor}}>
            <header className="top-header">
                {/* Logos for light and dark theme */}
				<div className="app-logo">
                    <img src="/assets/airbnb-logo.jpg" alt="Airbnb logo" />
				</div>
        
                <div className="booking-details" theme="light">
                    <ul>
                        <li>Places to stay</li>
                        <li>Experiences</li>
                        <li>Online experiences</li>
                    </ul>
                </div>
        
                <nav className="nav-links">
                    {user && (user.role === 'host' || user.role === 'admin') ? (
                        <div className="become-a-host">
                            <Link to="/view-listings" style={{color: 'white', textDecoration: 'none'}}>Welcome, {user.username}</Link>
                        </div>
                    ) : (
                        <div className="become-a-host">
                            <Link to="/login" style={{color: 'white', textDecoration: 'none'}}>Become a Host</Link>
                        </div>
                    )}
                        <div className="header-icon">
                            <i className="material-icons" style={{color: theme === "light" ? "black" : "white"}}>language</i>
                        </div>

                        <div className="user-info" ref={dropdownRef}>
                            <button onClick={() => setShowDropdown(!showDropdown)} className="menu-trigger"> 
                                <i className="material-icons" style={{color: 'black'}}>dehaze</i>
                            </button> 
                            <button onClick={() => setShowDropdown(!showDropdown)} className="menu-trigger">
                                <Link to="/login" style={{color: '#aaaaaa', padding: '2.5px 0 0 4.5px'}}>
                                    <i className="material-icons">account_circle</i>
                                </Link>
                            </button>
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    {user ? (
                                        <>
                                        <button onClick={() => navigate('/dashboard')} className="reservation">
                                            View Reservations
                                        </button>
                                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                                        </>
                                    ) : (
                                        <button onClick={() => navigate('/login')} className="reservation">Login</button>
                                    )}
                                </div>
                            )}
                        </div>
                </nav>
            </header>

            <div className="bottom-header">
                {/* Search bar/ Selector  */}
                <form>
                    <div className="location-options">
                        <label>Location</label>
                        <select value={location} onChange={handleLocation} placeholder="Select a location" required>
                            <option value="select">Select a location</option>
                            <option value="all">All Locations</option>
                            <option value="New York">New York</option>
                            <option value="Cape Town">Cape Town</option>
                            <option value="Johannesburg">Johannesburg</option>
                            <option value="Tokyo">Tokyo</option>
                            <option value="Phuket">Phuket</option>
                        </select>
                    </div>

                    <div className="date-selector">
                        <div className="checkin-date">
                            <label>Check in date</label>
                            <div className="calendar-trigger" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
                                <span>{checkInDate ? `Sept ${checkInDate}` : "Select a date"}</span>
                            </div>
                        </div>

                        <div className="checkout-date">
                            <label>Checkout date</label>
                            <div className="calendar-trigger" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
                                <span>{checkOutDate ? `Sept ${checkOutDate}` : "Select a date"}</span>
                            </div>
                        </div>
                        {isCalendarOpen && (
                            <Calendar 
                                checkInDate={checkInDate}   
                                checkOutDate={checkOutDate}
                                setCheckInDate={setCheckInDate}
                                setCheckOutDate={setCheckOutDate}
                                onClose={() => setIsCalendarOpen(false)}
                            />
                        )}
                    </div>
                
                    <div className="guest-options" ref={guestOptionsRef}>
                        <div className="guest-trigger" onClick={() => setIsOpen(!isOpen)}>
                            <label>Guests</label>
                            <div className="guest-total" style={{fontSize: '0.8rem'}}>
                                {totalGuests === 1 ? `${totalGuests} guest` : `${totalGuests} guests` }
                            </div>
                        </div>

                        {isOpen && (
                            <div className="guest-dropdown-menu">
                                <div className="selector">
                                    <p>Adults</p>
                                    <div className="count-selector">
                                        <button type="button" onClick={() => updateCount("adults", "minus")}>-</button>
                                        <span>{guestCount.adults}</span>
                                        <button type="button" onClick={() => updateCount("adults", "plus")}>+</button>
                                    </div>
                                </div>
                                <div className="selector">
                                    <p>Children</p>
                                    <div className="count-selector">
                                        <button type="button" onClick={() => updateCount("children", "minus")}>-</button>
                                        <span>{guestCount.children}</span>
                                        <button type="button" onClick={() => updateCount("children", "plus")}>+</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="search">
                        <i className="material-icons" style={{color: 'white'}}>search</i>
                    </div>
                </form>
            </div>
        </div>
    );
}
