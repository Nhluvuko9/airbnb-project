import { useState } from 'react';
import { propertyService } from '../services/propertyService';
import { useNavigate } from 'react-router-dom'; 
import './CreateListings.css';
import HeaderLight from '../components/HeaderLight';

export default function CreateListings() {
    const navigate = useNavigate();

    // State variables for form inputs
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [guests, setGuests] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [amenityInput, setAmenityInput] = useState("");
    const [amenititesList, setAmenitiesList] = useState([]);

    // UI tracking states
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("")

        // Strict validation layers
        if (Number(price) <= 0 || Number(guests) <= 0) {
            setErrorMessage("Price and guest count must be equal to or greater than 1");
            return;
        }

        if(description.trim().length < 30) {
            setErrorMessage("Description should be at least 30 characters long");
            return;
        }

        setIsLoading(true);

        // Data payload
        const formDataPayload = new FormData();
        formDataPayload.append('title', title.trim());
        formDataPayload.append('location', location.trim());
        formDataPayload.append('type', type);
        formDataPayload.append('price', Number(price));
        formDataPayload.append('guests', Number(guests));
        formDataPayload.append('bedrooms', Number(bedrooms));
        formDataPayload.append('bathrooms', Number(bathrooms));
        formDataPayload.append('description', description.trim());

        // Requests to node backend
        if (imageFile) {
            formDataPayload.append('image', imageFile);
        } 
        try {
            await propertyService.create(formDataPayload);
            navigate('/view-listings');
        } catch (error) {
            setErrorMessage(error.message || "Network error");
        }
    }; 

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setImageFile(selectedFile);
        }
    };

    const handleAddAmenity = (e) => {
        e.preventDefault();
        if (amenityInput.trim() !== "") {
            setAmenitiesList([...amenititesList, amenityInput.trim()]);
            setAmenityInput("");
        }
    }
  
    return (
        <div>
            <HeaderLight />
            <div className="listings-container">
                <div className="form-card">
                    <h2>Create a new listing</h2>

                    {errorMessage && <div className="error-banner">{errorMessage}</div>}

                    <form onSubmit={handleSubmit} id="create-listing-form">
                        <div className="inputs">
                            <label>Listing title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                        </div>

                        <div className="price-type-inputs">
                            <div className="inputs">
                                <label>Price</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" required/>
                            </div>

                            <div className="inputs">
                                <label>Type</label>
                                <select value={type} onChange={(e) => setType(e.target.value)} placeholder="Select an option" required>
                                    <option value="select">-- Select accomodation --</option>
                                    <option value="House">House</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Room">Private room</option>
                                </select>
                            </div>
                        </div>

                        <div className="inputs location">
                            <label>Location</label>
                            <select value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Select a location" required>
                                <option value="select">-- Select a location --</option>
                                <option value="New York">New York</option>
                                <option value="Cape Town">Cape Town</option>
                                <option value="Johannesburg">Johannesburg</option>
                                <option value="Tokyo">Tokyo</option>
                                <option value="Phuket">Phuket</option>
                            </select>
                        </div>


                        <div className="form-num-inputs">
                            <div className="inputs">
                                <label>Guests</label>
                                <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} min="1" placeholder="1" required/>
                            </div>
                            <div className="inputs">
                                <label>Bedroom</label>
                                <input type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} min="0" placeholder="0" required/>
                            </div>
                            <div className="inputs">
                                <label>Bathroom</label>
                                <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} min="0" placeholder="0" required/>
                            </div>
                        </div>

                        <div className="inputs">
                            <label>Description</label>
                            <textarea name="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" required></textarea>
                        </div>

                        <div className="image-upload">
                            <label htmlFor="upload-box">
                                <div className="add-image">
                                    <button className="add-img-btn">
                                        Upload Image
                                    </button>
                                </div>
                                <input type="file" className="image-upload-box" accept="image/*" onChange={handleFileChange} />
                            </label>
                        </div>
   
                        <div className="inputs">
                            <label>Amenities</label>
                            <div className="amenities">
                                <input type="text" value={amenityInput} onChange={(e) => setAmenityInput(e.target.value)} />
                                <button className='amenities-btn' onClick={handleAddAmenity}>Add</button>
                            </div>
                        </div>
                 
                        <div className="listing-btns">
                            <button type="submit" id="create-btn">{isLoading ? "Processing listing" : "Create listing"}</button>
                            <button type="submit" id="cancel-btn">Cancel</button>
                        </div>
            
                    </form>
                </div>    
            </div>
        </div>
    );   
}

