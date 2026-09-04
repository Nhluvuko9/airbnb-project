import { useNavigate } from "react-router-dom";
import './PropertyCard.css';

export default function PropertyCard({ property, onDeleteClick }) {
    const navigate = useNavigate();
    // Image placeholder for when images arent uploaded
    const placeholderImage = "https://placehold.co/600x400?text=No+image";
    const imageURL = property.imageURL && property.imageURL !== "https://placehold.co"
        ? property.imageURL
        : placeholderImage;

    return (
        <div className="container">
            <div className="property-card">
                {/* Property card display */}
                <div className="image-container">
                    <img src={imageURL} alt={property.title} className="property-img" onError={(e) => { e.currentTarget.src = placeholderImage; }}/>
                    <div className="card-actions">
                        <button onClick={() => navigate(`/update-listing/${property._id}`)} style={{backgroundColor: '#4254ef'}}>Update</button>
                        <button onClick={() => onDeleteClick(property._id)} className="delete-btn" style={{backgroundColor: '#ef386c'}}>Delete</button>
                    </div> 
                </div>

                <div className="card-details">
                    <div className="card-title-section" style={{lineHeight: '35px'}}>
                        <span style={{color: 'grey', fontSize: '1rem'}}>{property.type} - {property.location}</span>
                        <h3 className="card-title" style={{fontSize: '1.72rem'}}>{property.title}</h3>
                    </div><br />
                    <div className="card-information" style={{borderTop: '1px solid rgb(183, 182, 182)', padding: '10px 0px', width: '100px'}}></div>
                        <p style={{color: 'grey', fontSize: '0.9rem'}}>{property.guests} guests · {property.type} · {property.bedrooms} bedrooms · {property.bathrooms} bathrooms</p>
                        <p style={{color: 'grey', fontSize: '0.9rem'}}>{property.amenities}</p> 
                    <div className="card-information" style={{borderBottom: '1px solid rgb(183, 182, 182)', padding: '10px 0px', width: '100px'}}></div>
                    <div className="card-footer">
                        <span>⭐️ 4.7(280 reviews)</span>
                        <span style={{fontSize: '1.2rem'}}>$ {property.price}/night</span>
                    </div>
                </div>
            </div>
        </div>
    );
}