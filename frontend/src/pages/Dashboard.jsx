import { useEffect, useState } from 'react';
import HeaderLight from '../components/HeaderLight';
import PropertyCard from '../components/PropertyCard';
import Notification from '../components/Notification';  
import { propertyService } from '../services/propertyService';
import { Link } from 'react-router-dom';
import './ViewListings.css';


export default function Dashboard () {
    const [properties, setProperties] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' })
    const [isLoading, setIsLoading] = useState('');

    useEffect(() => {
        const displayPropertites = async () => {
            try {
                const data = await propertyService.getAll();
                setProperties(data);
            } catch (error) {
                setNotification({
                message: error.message || "Unable to connect to database. Please check your network connection.",
                type: "error"
                });
            } finally {
                setIsLoading(false);
            }
        }; displayPropertites();
    }, []);


    const handleDeleteClick = async (id) => {
        if (!window.confirm("Are you sure you want to delete this property?")) {
            return;
        }

        try {
            await propertyService.delete(id);
            // Remove the deleted property from the state
            setProperties((currentProperties) => currentProperties.filter((property) => property._id !== id));
        } catch (error) {
            setNotification( {message: error.message || "Could not delete listing.", type: "error"});
        }
    };

    return (
        <div>
            <HeaderLight />
            <div className='dashboard-container'>
                {/* {errorMessage && <div className="error-banner">{errorMessage}</div>} */}
                <Notification message={notification.message} type={notification.type} />

                {isLoading ? (
                    <div className='loading-progress'>Loading database elements...</div>
                ) : properties.length === 0 ? (
                    <div className='empty-property-card'>
                        <div className="viewpage">
                            <div className="listings">
                                <div className="categories">
                                    <button><Link to="/view-reservations" style={{ textDecoration: 'none', color: 'black', fontWeight: '400' }}>View Reservations</Link></button>
                                    <button><Link to="/view-listings" style={{ textDecoration: 'none', color: 'black', fontWeight: '400' }}>View Listings</Link></button>
                                    <button><Link to="/create-listing" style={{ textDecoration: 'none', color: 'black', fontWeight: '400' }}>Create Listing</Link></button>
                                </div>
                    
                                <div className="my-listings">
                                    <h2 style={{ fontSize: '1.75rem', textAlign: 'center', padding: '20px 0' }}>My Listings</h2>
                                    <h3>No listings found</h3>
                                    <p>Click "Become a host" to upload property listings.</p>
                                    <div className="property-listing">
                                                                          
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (<div className='property-grid'>
                        {properties.map((item) => (
                            <PropertyCard key={item._id} property={item} onDeleteClick={handleDeleteClick} />
                        ))}
                </div>)}
            </div>
        </div>
    );   
}

