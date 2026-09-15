// import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { propertyService } from '../services/propertyService';
import { createNewReservation } from '../services/reservationService';
import { authService } from '../services/authService';
import Header2 from '../components/Header2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './LocationDetails.css';

export default function LocationDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [property,setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isSubmit, setIsSubmit] = useState(false);

    // Calculator states
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const data = await propertyService.getById(id);
                setProperty(data);
            } catch (error) {
                console.error("Failed to load details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPropertyData();
    }, [id]);

    if (loading) return <div>Loading property details</div>
    if (!property) return <div>Property not found</div>

    // Cost Calculator
    const calculateNights = () => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const timeDiff = end.getTime() - start.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return nights > 0 ? nights : 0;
    };

    const nightCounts = calculateNights();
    const priceTotal = property.price * nightCounts;
    const serviceFee = property.serviceFee || 45;
    const cleaningFee = property.cleaningFee || 35;
    const occupancyTaxes = property.occupancyTaxes || 30;
    const totalCost = priceTotal + cleaningFee + serviceFee + occupancyTaxes;

    const handleResSubmit = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        
        try {
            const currentUser = authService.getCurrentUser();
            await createNewReservation({
                username: currentUser?.username,
                checkInDate: checkIn,
                checkOutDate: checkOut,
                propertyName: property.title,
                guests: Number(guests)
            });
            navigate('/view-reservations');
        } catch (error){
            console.error("Booking error:", error)
            alert(error.message || 'Unable to create reservation.');
        } finally {
            setIsSubmit(false);
        }
    }

    return (
        <div className="location-details-page">
            <Header2 />
            <div className="details-container">
                {/* Heading and subsection */}
                <section className="details-header">
                    <h2>{property.title}</h2>
                    <span>⭐️ {property.rating || '4.5'} ({property.reviewsCount || '280 reviews'})</span>
                    <span>{property.location}</span>
                </section>

                {/* Image gallery */}
                <section className="image-collection">
                    <div className="large-image">
                        <img src={property.imageURL} alt={property.title} />
                    </div>
                    <div className="small-images">
                        <img src={property.imageURL} alt="img 1" />
                        <img src={property.imageURL} alt="img 2" />
                        <img src={property.imageURL} alt="img 3" />
                        <img src={property.imageURL} alt="img 4" />
                    </div>
                </section>

                {/* Main content */}
                <div className="content">
                    <div className="left-column-info">
                        <div className="host-info" style={{paddingBottom: '30px'}}>
                            <div>
                                <h3>{property.type} hosted by John</h3>
                                <p>{property.guests} guests · {property.type} · {property.bedrooms} bedrooms · {property.bathrooms} bathrooms</p>
                            </div>
                            <div className="host-img">
                                <img src="/assets/profile7.jpg" alt="profile7" style={{width: '40px', height: '40px', borderRadius: '50%'}} />
                            </div>
                        </div>
                        <div className="info-feature">
                            <div className="feature">
                                <i className="material-icons">home</i>
                                <div>
                                    <h4>{property.type}</h4>
                                    <p>You'll have the entire place to yourself</p>
                                </div>
                            </div>
                            <div className="feature">
                                <i className="material-icons">local_laundry_service</i>
                                <div>
                                    <h4>Enhanced Cleaning:</h4>
                                    <p>This host is commited to a Airbnb's 5-step enhanced cleaning process.</p>
                                </div>
                            </div>
                            <div className="feature">
                                <i className="material-icons">date_range</i>
                                <div>
                                    <h4>Free Cancellation</h4>
                                    <p>Free cancellation before September 1</p>
                                </div>
                            </div>
                            <div className="feature">
                                <i className="material-icons">vpn_key</i>
                                <div>
                                    <h4>Self-check-in:</h4>
                                    <p>Check yourself in with keypad</p>
                                </div>
                            </div>
                        </div>

                        <div className="detailed-description">
                            <p style={{padding: '12px 5px'}}>{property.description}</p>
                        </div>

                        <div className="accommodation-details">
                            <h3 style={{fontSize: '1.30rem', padding: '20px 0 12px 0'}}>Where you'll sleep</h3>
                            <img src="/assets/where-you'll-sleep.jpg" alt="Bedroon image" />
                            <p style={{padding: '2px'}}>Spacious bedroom with seating, built-in study/vanity table and wall mount TV</p>
                            <p style={{padding: '8px 2px 16px 0', fontSize: '0.9rem'}}>Total bedrooms: {property.bedrooms}</p>
                        </div>

                        <div className="amenities-section">
                            <h3 style={{fontSize: '1.30rem', padding: '20px 0 12px 0', color: 'rgb(130, 130, 130)'}}>What this place offers</h3>
                            <ul>
                                <li><i className="material-icons">local_florist</i> Garden view</li>
                                <li><i className="material-icons">wifi</i> Wifi</li>
                                <li><i className="material-icons">local_laundry_service</i> Free washer-in building</li>
                                <li><i className="material-icons">ac_unit</i> Central air conditioning</li>
                                <li><i className="material-icons">kitchen</i> Refrigerator</li>
                                <li><i className="material-icons">restaurant</i> Kitchen</li>
                                <li><i className="material-icons">pets</i> Pets allowed</li>
                                <li><i className="material-icons">whatshot</i> Dryer</li>
                                <li><i className="material-icons">security</i> Security camera</li>
                                <li><i className="material-icons">motorcycle</i> Bicycles</li>
                            </ul>
                            <button id='amenities-btn'>View all 37 amenities</button>
                        </div>

                        <div className="dates-section">
                            <h3 style={{fontSize: '1.30rem', padding: '20px 0 12px 0', color: 'rgb(130, 130, 130)'}}>7 Nights in {property.location}</h3>
                            <div className="date-range">
                                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} style={{border:'none'}} readOnly/> - 
                                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} style={{border:'none'}} readOnly/>
                            </div>
                            <div className="calendar-container">
                                <div className="calendar-titles">
                                    <h5>Check-in</h5>
                                    <h5>Check-out</h5>
                                </div>
                                <div className="calendars">
                                    <DatePicker  
                                        selected={checkIn ? new Date(checkIn) : null}
                                        onChange={(date) => setCheckIn(date.toISOString().split('T')[0])}
                                        inline
                                    />
                                    <DatePicker  
                                        selected={checkOut ? new Date(checkOut) : null}
                                        onChange={(date) => setCheckOut(date.toISOString().split('T')[0])}
                                        inline
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Cost calculator */}
                    <div className="right-column-info">
                        <div className="calculator-card">
                            <div className="card-header">
                                <span>$ {property.price}/night</span>
                                <span>⭐️ {property.rating || '4.5'} ({property.reviewsCount || '280'})</span>
                            </div>
                            <form onSubmit={handleResSubmit} className="calc-inputs-box">
                                <div className="dates-row">
                                    <div className="date-input-wrapper">
                                        <label>CHECK-IN</label>
                                        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
                                    </div>
                                    <div className="date-input-wrapper">
                                        <label>CHECK-OUT</label>
                                        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="guest-input-wrapper">
                                    <label>GUESTS</label>
                                    <input type="number" min="1" max={property.guests} value={guests} onChange={(e) => setGuests(e.target.value)} />
                                </div>

                                <button type="submit" className="reserve-action-btn" >{isSubmit ? 'Reserving...' : 'Reserve'}</button>
                            </form>

                            {/* Cost breakdown */}
                            {nightCounts > 0 && (
                                <div className="cost-breakdown-panel">
                                    <div className="cost-row">
                                        <span>${property.price} x {nightCounts} nights</span>
                                        <span>${priceTotal}</span>
                                    </div>
                                    <div className="cost-row">
                                        <span>Cleaning fee</span>
                                        <span>${cleaningFee}</span>
                                    </div>
                                    <div className="cost-row">
                                        <span>Service fee</span>
                                        <span>${serviceFee}</span>
                                    </div>
                                    <div className="cost-row">
                                        <span>Occupancy taxes</span>
                                        <span>${occupancyTaxes}</span>
                                    </div>
                                    <div className="cost-row total-row">
                                        <span><strong>Total before taxes</strong></span>
                                        <span><strong>${totalCost}</strong></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="reviews">
                    <h4><i className="material-icons" style={{color: '#ef386c'}}>star</i>5.0 - 7 reviews</h4>
                    <ul>
                        <div className="rating-bar"> 
                            <p>Cleanliness</p>
                            <div className="bar-wrapper">
                                <div className="inner-bar" style={{width: '230px'}}></div>
                            </div>  
                            <p>5.0</p>
                        </div>
                                      
                        <div className="rating-bar">
                            <p>Accuracy</p>
                            <div className="bar-wrapper">
                                <div className="inner-bar" style={{width: '150px'}}></div>
                            </div>
                            <p>3.0</p>
                        </div>

                        <div className="rating-bar">
                            <p>Communication</p>
                            <div className="bar-wrapper">
                                <div className="inner-bar" style={{width: '200px'}}></div>
                            </div>
                            <p>4.7</p>
                        </div>

                        <div className="rating-bar">
                            <p>Location</p>
                            <div className="bar-wrapper">
                                <div className="inner-bar" style={{width: '230px'}}></div>
                            </div>
                            <p>5.0</p>
                        </div>

                        <div className="rating-bar">
                            <p>Check in</p>
                            <div className="bar-wrapper">
                                <div className="inner-bar" style={{width: '220px'}}></div>
                            </div>
                            <p>4.8</p>
                        </div>
                        <div className="rating-bar">
                            <p>Value</p>
                            <div className="bar-wrapper">
                                <div className="inner-bar" style={{width: '200px'}}></div>
                            </div>
                            <p>4.7</p>
                        </div>
                    </ul>

                    <div className="user-review">
                        <div className="profile">
                            <div className="user-details">
                                <img src="/assets/profile1.jpg" alt="profile1" />
                                <div className="name-date">
                                    <h5>Alice</h5>
                                    <p>March 2023</p>
                                </div>
                            </div>
                            <div className="comment" style={{color: 'black'}}>
                                <p>Amazing place, very clean and well-located.</p>
                            </div>
                        </div>

                        <div className="profile">
                            <div className="user-details">
                                <img src="/assets/profile4.jpg" alt="profile4" />
                                <div className="name-date">
                                    <h5>Dave</h5>
                                    <p>December 2022</p>
                                </div>
                            </div>
                            <div className="comment">
                                <p>Fantastic stay the location is perfect.</p>
                            </div>
                        </div>

                        <div className="profile">
                            <div className="user-details">
                                <img src="/assets/profile5.jpg" alt="profile5" />
                                <div className="name-date">
                                    <h5>Bob</h5>
                                    <p>February 2023</p>
                                </div>
                            </div>
                            <div className="comment">
                                <p>Great communication with the host and easy check-in process.</p>
                            </div>
                        </div>

                        <div className="profile">
                            <div className="user-details">
                                <img src="/assets/profile3.jpg" alt="profile3" />
                                <div className="name-date">
                                    <h5>Eve</h5>
                                    <p>November 2022</p>
                                </div>
                            </div>
                            <div className="comment">
                                <p>Very clean and spacious. Would definitely come back.</p>
                            </div>
                        </div>

                        <div className="profile">
                            <div className="user-details">
                                <img src="/assets/profile2.jpg" alt="profile2" />
                                <div className="name-date">
                                    <h5>Carol</h5>
                                    <p>January 2023</p>
                                </div>
                            </div>
                            <div className="comment">
                                <p>The apartment was exactly as described. Highly recommend.</p>
                            </div>
                        </div>

                        <div className="profile">
                            <div className="user-details">
                                <img src="/assets/profile6.jpg" alt="profile6" />
                                <div className="name-date">
                                    <h5>Frank</h5>
                                    <p>October 2022</p>
                                </div>
                            </div>
                            <div className="comment">
                                <p>Excellent value for the space. Loved the neighbourhood.</p>
                            </div>
                        </div>
                    </div>
                    <button id='reviews-btn'>Show all reviews</button>
                </div>

                <div className="hosted-by">
                    <div className="profile">
                        <div className="user-details">
                            <img src="/assets/profile7.jpg" alt="profile6" />
                            <div className="name-date">
                                <h3>Hosted By John</h3>
                                <p>Joined June 2024</p>
                            </div>
                        </div>
                        <div className="comment">
                            <div className="host-ratings">
                                <i className="material-icons" style={{color: '#ef386c', fontSize: '1.45rem'}}>star</i>
                                <p>320 Reviews</p>
                            </div>
                            <div className="host-ratings">
                                <i className="material-icons" style={{color: '#ef386c', fontSize: '1.45rem'}}>verified_user</i>
                                <p>Identity verified</p>
                            </div>
                            <div className="host-ratings">
                                <i className="material-icons" style={{color: '#ef386c', fontSize: '1.45rem'}}>sentiment_very_satisfied</i>
                                <p>Superhost</p>
                            </div>
                        </div>

                        <div className="host-description">
                            <p>John is a super host</p>
                            <p>Superhosts are experienced, highly rated host who are committed to providing great stays for guests.</p>
                            <p>Response rate 100%</p>
                            <p>Response time</p>
                        </div>

                        <button id="contact-btn">Contact Host</button>
                        <p style={{padding: '25px 0 40px 0'}}>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</p>
                    </div>
                    
                    <div className="location-detail-footer">
                        <div className="house-rules">
                            <h3>House Rules</h3>
                            <ul>
                                <li><i className="material-icons">access_time</i> Check in: After 4:00 PM</li>
                                <li><i className="material-icons">access_time</i> Check out: 10:00 AM</li>
                                <li><i className="material-icons">lock_outline</i> Self check-in with lock-box</li>
                                <li><i className="material-icons">child_friendly</i> Not suitable for infants(under 2 years)</li>
                                <li><i className="material-icons">smoke_free</i> No smoking</li>
                                <li><i className="material-icons">pets</i> No pets</li>
                                <li><i className="material-icons">cake</i> No parties or events</li>
                            </ul>
                        </div>
                        <div className="health-safety">
                            <h3>Health & Safety</h3>
                            <ul>
                                <li><i className="material-icons">bubble_chart</i>Committed to Airbnb enhanced cleaning process.</li>
                                <li><a href="">Show more</a></li>
                                <li><i className="material-icons">star_border</i> Airbnb social-distancing and other COVID-19-related guidelines apply</li>
                                <li><i className="material-icons">smoking_rooms</i> Carbon monoxide alarm </li>
                                <li><i className="material-icons">whatshot</i> Smoke alarm</li>
                                <li><i className="material-icons">credit_card</i> Security Deposit-if you change the home, you may be charged up to $566</li>
                                <li><a href="">Show more</a></li>
                            </ul>
                        </div>
                        <div className="cancellation">
                            <h3>Cancellation Policy</h3>
                            <li>Free cancellation before September 14</li>
                            <li><a href="">Show more</a></li>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="footer-categories">
                    <div className="support">
                        <ul>
                            <li style={{fontWeight: '700'}}>Support</li>
                            <li>Help Center</li>
                            <li>Safety information</li>
                            <li>Cancellation options</li>
                            <li>Our COVID-19 Response</li>
                            <li>Supporting people with disabilities</li>
                            <li>Report a neighbourhood concern</li>
                        </ul>
                    </div>
                    <div className="community">
                        <ul>
                            <li style={{fontWeight: '700'}}>Community</li>
                            <li>Airbnb.org: disaster relief housing</li>
                            <li>Support Afghan refugee</li>
                            <li>Combating discrimination</li>
                            <li>Join the LGBTQ+ community</li>
                            <li>Guest Referrals</li>
                            <li>Gift cards</li>
                        </ul>
                    </div>
                    <div className="hosting">
                        <ul>
                            <li style={{fontWeight: '700'}}>Hosting</li>
                            <li>Try hosting</li>
                            <li>AirCover: protection for Hosts</li>
                            <li>Explore hosting resources</li>
                            <li>Visit our community forum</li>
                            <li>How to host responsibly</li>
                            <li>Host an online experience</li>
                        </ul>
                    </div>
                    <div className="about">
                        <ul>
                            <li style={{fontWeight: '700'}}>About</li>
                            <li>Newsroom</li>
                            <li>Learn about new features</li>
                            <li>Letter from our founders</li>
                            <li>Careers</li>
                            <li>Investors</li>
                            <li>Airbnb Luxe</li>
                        </ul>
                    </div>
                </div>

                {/* Copyright and social media icons */}
                <div className="copyright-section">
                    <div className="privacy-terms">
                        <p>© 2026 Airbnb Clone - Privacy - Terms - Sitemap</p>
                    </div>

                    <div className="footer-icons">
                        <i className="material-icons">language</i>
                        <select className="language-select"><option>English</option></select>
                        <select className="currency-select"><option>USD</option></select>
                        <div className="social-media-icons">
                            <img src="/assets/facebook-svgrepo-com.svg" alt="Facebook logo" />
                            <img src="/assets/twitter-154-svgrepo-com.svg" alt="X logo" />
                            <img src="/assets/instagram-svgrepo-com.svg" alt="Instagram logo" />
                        </div>
                    </div>


                </div>
            </footer>
        </div>
    )

}