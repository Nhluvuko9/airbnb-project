

export default function PropertyCard({ property }) {
    return (
        <div className="property-card">
            <div className="image-container">
                <img src={property.imageURL} alt={property.title} className="property-img"/>
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
            </div>
        </div>
    );
}