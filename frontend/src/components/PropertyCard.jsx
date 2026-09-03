import { useNavigate } from "react-router-dom";

export default function PropertyCard({ property, onDeleteClick }) {
    const navigate = useNavigate();
    const placeholderImage = "https://placehold.co/600x400?text=No+image";
    const imageURL = property.imageURL && property.imageURL !== "https://placehold.co"
        ? property.imageURL
        : placeholderImage;

    return (
        <div className="property-card">
            <div className="image-container">
                <img src={imageURL} alt={property.title} className="property-img" onError={(e) => { e.currentTarget.src = placeholderImage; }}/>
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
                    <button onClick={() => onDeleteClick(property._id)} className="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    );
}