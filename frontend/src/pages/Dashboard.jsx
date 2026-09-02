import { useEffect, useState } from 'react';
import HeaderLight from '../components/HeaderLight';
import PropertyCard from '../components/PropertyCard';
import { propertyService } from '../services/propertyService';


export default function Dashboard () {
    const [properties, setProperties] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState('');

    useEffect(() => {
        const displayPropertites = async () => {
            try {
                const data = await propertyService.getAll();
                setProperties(data);
            } catch (error) {
                setErrorMessage(error.message || "Could not display item.");
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
            setProperties(properties.filter((_, index) => index !== id));
        } catch (error) {
            setErrorMessage(error.message || "Could not delete listing.");
        }
    };

    return (
        <div>
            <HeaderLight />
            <div className='dashboard-container'>
                <h2>Host dashboard</h2>

                {errorMessage && <div className="error-banner">{errorMessage}</div>}

                {isLoading ? (
                    <div className='loading-progress'>Loading database elements...</div>
                ) : properties.length === 0 ? (
                    <div className='empty-property-card'>
                        <h3>No listings found</h3>
                        <p>Click "Become a host" to upload property listings.</p>
                    </div>
                ) : (<div className='property-grid'>
                        {properties.map((item) => (
                            <PropertyCard property={item} onDeleteClick={handleDeleteClick} />
                        ))}
                </div>)}
            </div>
        </div>
    );   
}

