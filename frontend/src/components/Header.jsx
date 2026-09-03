import { authService } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Calendar from '../components/Calendar';
import './Header.css';

export default function Header({ theme } ) {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (error) {
                console.error("Parsing user data failed:", error);
            }
        }

        // const handleClickOutside = (event) => {
        //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        //         setShowDropdown(false);
        //     }
        // };
        // document.addEventListener('mouseover', handleClickOutside);
        // return () => document.removeEventListener('mouseover', handleClickOutside);
    }, []);

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        setShowDropdown(false);
        navigate('/login');
    };

    const [location, setLocation] = useState("");

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    const [isOpen, setIsOpen] = useState("");
    const [guestCount, setGuestCount] = useState({
        adults: 0,
        children: 0
    });

    const updateCount = (type, count) => {
        setGuestCount(prev => {
            const current = prev[type];

            if (count === "minus" && type === "adults" && current <= 1) return prev;
            if (count === "minus" && current <= 0) return prev;

            return {
                ...prev,
                [type]: count === "plus" ? current + 1 : current - 1
            };
        })
    }

    const totalGuests = guestCount.adults + guestCount.children;

    const [isHomepage, setIsHomepage] = useState(window.location.pathname === '/homepage');
    const [setTheme] = useState(isHomepage ? "dark" : "light");
    const headerBgColor = theme === "light" ? "white" : "black";

    console.log("Header read user data", localStorage.getItem('user'))
    return (
        <div className="header-container" onLoad={setIsHomepage && setTheme} style={{backgroundColor: headerBgColor}}>
            <header className="top-header">
                <div className="app-logo">
                        <img src="/assets/airbnb-logo.jpg" alt="Airbnb logo"/>
                </div>
        
                <div className="booking-details">
                        <ul>
                            <li>Places to stay</li>
                            <li>Experiences</li>
                            <li>Online experiences</li>
                        </ul>
                    {/* {!isHomepage && (
                    )} */}
                </div>
        
                <nav className="nav-links">
                    {user && (user.role === 'host' || user.role === 'admin') && (
                        <div className="become-a-host">
                            <Link to="/create-listing" style={{color: theme === "light" ? "black" : "white", textDecoration: 'none'}}>Become a Host</Link>
                        </div>
                    )}
                        <div className="header-icon">
                            <i className="material-icons" style={{color: theme === "light" ? "black" : "white"}}>language</i>
                        </div>

                        <div className="user-info" ref={dropdownRef}>
                            <button onClick={() => setShowDropdown(!showDropdown)} className="menu-trigger"> 
                                <i className="material-icons" style={{color: 'black'}}>dehaze</i>
                            </button> 
                            <Link to="/login" style={{color: '#aaaaaa', padding: '2.5px 0 0 4.5px'}}>
                                <i className="material-icons">account_circle</i>
                            </Link>
                            {!showDropdown && (
                                <div className="dropdown-menu">
                                    {!user ? (
                                        <>
                                        <button onClick={() => navigate('/dashboard')} className="reservation">
                                            View Reservations
                                        </button>
                                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                                        </>
                                    ) : (
                                        <Link to="/login" style={{color: '#aaaaaa', padding: '2.5px 0 0 4.5px'}}>
                                            <i className="material-icons">account_circle</i>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>


                        {/* {user ? (
                                <div className="user-menu" style={{color: theme === "light" ? "black" : "white"}}>
                                    <span>Hello, {user.username} ({user.role})</span>

                                    {(user.role === "host" || user.role === "admin") && (
                                        <div className="become-a-host">
                                            <Link to="/create-listing" style={{color: theme === "light" ? "black" : "white", textDecoration: 'none'}}>Become a Host</Link>
                                        </div>
                                    )}
                                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                                </div>
                        ) : (
                            <div className="user-info">
                                <i className="material-icons" style={{color: 'black'}}>dehaze</i>
                                <Link to="/login" style={{color: '#aaaaaa', padding: '2.5px 0 0 4.5px'}}><i className="material-icons">account_circle</i></Link>
                            </div>
                        )} */}
                </nav>
            </header>

            <div className="bottom-header">
                <form>
                    <div className="location-options">
                        <label>Location</label>
                        <select value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Select a location" required>
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
                
                    <div className="guest-options">
                        <div className="guest-trigger" onClick={() => setIsOpen(!isOpen)}>
                            <label>Guests</label>
                            <div className="guest-total" style={{fontSize: '0.8rem'}}>
                                {totalGuests} {totalGuests === 1 ? "guest" : "guests" }
                            </div>
                        </div>

                        {isOpen && (
                            <div className="guest-dropdown-menu">
                                <div className="selector">
                                    <p>Adults</p>
                                    <div className="count-selector">
                                        <button onClick={() => updateCount("adults", "minus")}>-</button>
                                        <span>{guestCount.adults}</span>
                                        <button onClick={() => updateCount("adults", "plus")}>+</button>
                                    </div>
                                </div>
                                <div className="selector">
                                    <p>Children</p>
                                    <div className="count-selector">
                                        <button onClick={() => updateCount("children", "minus")}>-</button>
                                        <span>{guestCount.children}</span>
                                        <button onClick={() => updateCount("children", "plus")}>+</button>
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
