import { Link } from 'react-router-dom';
import HeaderLight from '../components/HeaderLight';
// import PropertyCard from '../components/PropertyCard';
import './ViewListings.css';

export default function ViewListings() {

    return (
        <div className="viewpage">
            <header>
                <HeaderLight />
            </header>
            <div className="listings">
                <div className="categories">
                    <button><Link to="/view-reservations" style={{ textDecoration: 'none', color: 'black', fontWeight: '400' }}>View Reservations</Link></button>
                    <button><Link to="/view-listings" style={{ textDecoration: 'none', color: 'black', fontWeight: '400' }}>View Listings</Link></button>
                    <button><Link to="/create-listing" style={{ textDecoration: 'none', color: 'black', fontWeight: '400' }}>Create Listing</Link></button>
                </div>

                <div className="my-listings">
                    <h2 style={{ fontSize: '1.75rem', textAlign: 'center', padding: '20px 0' }}>My Listings</h2>
                    <div className="property-listing">
                        {/* <PropertyCard /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}