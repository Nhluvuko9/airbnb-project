import { useParams } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { propertyService } from '../services/propertyService';
import './LocationDetails.css';

export default function LocationDetails() {
    const { id } = useParams();
    const [property,setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");

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
    const totalCost = priceTotal + cleaningFee + serviceFee;

    return (
        <div className="location-details-page">
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
                            <h3 onLoad={(e) => setUsername(e.target.value)}>{property.type} hosted by {username}</h3>
                            <p>{property.guests} guests · {property.type} · {property.bedrooms} bedrooms · {property.bathrooms} bathrooms</p>
                        </div>
                        <div className="info-feature">
                            <div className="feature">
                                <i className="material-icons">home</i>
                                <div>
                                    <h3>{property.type}</h3>
                                    <p>You'll have the entire place to yourself</p>
                                </div>
                            </div>
                            <div className="feature">
                                <i className="material-icons">local_laundry_service</i>
                                <div>
                                    <h3>Enhanced Cleaning:</h3>
                                    <p>This host is commited to a Airbnb's 5-step enhanced cleaning process.</p>
                                </div>
                            </div>
                            <div className="feature">
                                <i className="material-icons">date_range</i>
                                <div>
                                    <h3>Free Cancellation</h3>
                                    <p>Free cancellation before September 1</p>
                                </div>
                            </div>
                            <div className="feature">
                                <i className="material-icons">vpn_key</i>
                                <div>
                                    <h3>Self-check-in:</h3>
                                    <p>Check yourself in with keypad</p>
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
                            <form className="calc-inputs-box">
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

                                <button type="submit" className="reserve-action-btn" onClick={(e) => e.preventDefault()}>Reserve</button>
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
                                    <div className="cost-row total-row">
                                        <span><strong>Total before taxes</strong></span>
                                        <span><strong>${totalCost}</strong></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}