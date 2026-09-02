import { useState, useEffect } from 'react';
import { propertyService } from '../services/propertyService';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderLight from '../components/HeaderLight';

export default function UpdateListings() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [guests, setGuests] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [description, setDescription] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const data = await propertyService.getById(id);
                setTitle(data.title);
                setLocation(data.location);
                setType(data.type);
                setPrice(data.price);
                setGuests(data.guests);
                setBedrooms(data.bedrooms);
                setBathrooms(data.bathrooms);
                setDescription(data.description);
                setIsLoading(false);
            } catch (error) {
                setErrorMessage(error.message || "Could not load existing details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (Number(price) <= 0 || Number(guests) <= 0) {
            setErrorMessage("Price and guest count must be equal to or greater than 1");
            return;
        }

        try {
            setIsLoading(true);

            const updatedDetails = {
                title,
                location,
                type,
                price: Number(price),
                guests: Number(guests),
                bedrooms: Number(bedrooms),
                bathrooms: Number(bathrooms),
                description: description.trim()
            };
            await propertyService.update(id, updatedDetails);
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage(error.message || "Failed to update property details.");
            setIsLoading(false);
        }
    };

    return (
        <div>
            <header>
                <HeaderLight />
            </header>
            <div className="listings-container">
                <div className="form-card">
                    <h2>Update listing</h2>
                    {errorMessage && <div className="error-banner">{errorMessage}</div>}
                    {isLoading ? (
                        <p>Loading existing details...</p>
                    ) : (
                        <form onSubmit={handleSubmit} id="update-listing-form">
                            <div className="inputs">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>

                            <div className="inputs">
                                <label htmlFor="location">Location</label>
                                <select value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Select an option" required>
                                    <option value="select">-- Select location --</option>
                                    <option value="New York">New York</option>
                                    <option value="Cape Town">Cape Town</option>
                                    <option value="Johannesburg">Johannesburg</option>
                                    <option value="Tokyo">Tokyo</option>
                                    <option value="Phuket">Phuket</option>
                                </select>
                            </div>

                            <div className="inputs">
                                <label htmlFor="type">Type</label>
                                <select value={type} onChange={(e) => setType(e.target.value)} placeholder="Select an option" required>
                                    <option value="select">-- Select accomodation --</option>
                                    <option value="House">House</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Room">Private room</option>
                                </select>
                            </div>

                            <div className="inputs">
                                    <label htmlFor="type">Type</label>
                                    <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} required />
                            </div>
                            <div className="inputs">
                                    <label htmlFor="price">Price</label>
                                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                            </div>

                            <div className="form-num-inputs">
                                <div className="inputs">
                                        <label htmlFor="guests">Guests</label>
                                        <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} min="1" placeholder="1" required />
                                </div>
                                <div className="inputs">
                                        <label htmlFor="bedrooms">Bedrooms</label>
                                        <input type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} min="0" placeholder="0" required />
                                </div>
                                <div className="inputs">
                                        <label htmlFor="bathrooms">Bathrooms</label>
                                        <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} min="0" placeholder="0" required />
                                </div>
                            </div>

                            <div className="inputs">
                                    <label htmlFor="description">Description</label>
                                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                            </div>

                            <div className="listing-btns">
                                <button type="submit" id="save-btn" disabled={isLoading}>
                                    {isLoading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}