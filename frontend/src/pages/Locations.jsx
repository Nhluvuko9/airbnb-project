import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { propertyService } from '../services/propertyService';
import './Locations.css';

export default function Locations () {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const targetCity = searchParams.get('city') || 'all';

    const [allListings, setAllListings] = useState([]);

    // Fetch property listing data 
    useEffect(() => {
        const marketplaceData = async () => {
            try{
                const data = await propertyService.getAll();
                setAllListings(data);
            } catch (error) {
                console.error("Data failed to load:", error);
            }
        };
        marketplaceData();
    }, []);

    // Filter locations to display
    const filteredListings = targetCity ==='all'
        ? allListings
        : allListings.filter(item => item.location.toLowerCase().includes(targetCity.toLowerCase()));

    return (
        <div>
            <div className="locations-container">
                <h2 style={{padding: '8px', fontSize: '1.60rem'}}>
                    {filteredListings.length} {filteredListings === 1 ? 'stay' : 'stays'} in {targetCity === 'all' ? 'all locations' : targetCity}
                </h2>
            
                <div className="all-locations-list">
                    {filteredListings.map(property => (
                        <div key={property._id} className="listing-card" onClick={() => navigate(`/locations/${property._id}`)}>
                            <img src={property.imageURL} alt={property.title} />
                            <div>
                                <div className="card-info2">
                                    <span style={{color: 'grey', fontSize: '0.85rem'}}>{property.type}</span>
                                    <h3 className="card-title" style={{marginBottom: '8px'}}>{property.location}</h3>
                                    
                                    <div className="card-information" style={{borderTop: '1px solid rgb(183, 182, 182)', padding: '5px 0px', width: '100px'}}></div>
                                    <p style={{color: 'grey', fontSize: '0.75rem'}}>{property.guests} guests · {property.type} · {property.bedrooms} bedrooms · {property.bathrooms} bathrooms</p>
                                    <p style={{color: 'grey', fontSize: '0.75rem'}}>{Array.isArray(property.amenities) ? property.amenities.join(' · ') : property.amenities}</p>
                                    <div className="card-information" style={{borderBottom: '1px solid rgb(183, 182, 182)', padding: '5px 0px', width: '100px'}}></div>

                                </div>
        
                                <div className="card-footer" >
                                    <span style={{color: 'grey', fontSize: '0.85rem'}}>⭐️ {property.rating || '4.5'} ({property.reviewsCount || '280 reviews'})</span>
                                    <span style={{color: 'grey', fontSize: '1rem'}}>$ {property.price}/night</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}