import { useNavigate } from "react-router-dom";

export default function PropertyCard({ property, onDeleteClick }) {
    const navigate = useNavigate();

    return (
        <div className="property-card">
            <div className="image-container">
                <img src={property.imageURL || "https://unsplash.com"} alt={property.title} className="property-img"/>
            </div>
            <div className="card-details">
                <div className="card-title-section">
                    <h3 className="card-title">{property.title}</h3>
                    <span>{property.type}</span>
                </div>
                <p>{property.location}</p>
                <p>{property.description}</p>
                <div className="card-footer">
                    <span><strong>$ {property.price}</strong></span>
                    <span>/ night</span>
                </div>

                <div className="card-actions">
                    <button onClick={() => navigate(`/update-listing/${property._id}`)}>Update</button>
                    <button onClick={() => onDeleteClick(property.id)} className="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    );
}