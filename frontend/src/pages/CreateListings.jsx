import { useState } from 'react';
import Header from '../components/Header';

export default function CreateListings() {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [guests, setGuests] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [description, setDescription] = useState("");
    const [amenities, setAmenities] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // const listingInformation = { title: String(title), location: String(location), type: String(type), price: Number(price), guests: Number(guests), bedrooms: Number(bedrooms), bathrooms: Number(bathrooms), description: String(description) };
        console.log("Listing information form saved");
    }; 
    
    return (
        <div>
            <Header />
            <div className="listings-container">
                <div className="form-card">
                    <h2>Create a new listing</h2>

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
                                    <option value="House">House</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Room">Room</option>
                                </select>
                            </div>
                        </div>

                        <div className="inputs location">
                            <label>Location</label>
                            <select value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Select a location" required>
                                <option value="New York">New York</option>
                                <option value="Cape Town">Cape Town</option>
                                <option value="London">London</option>
                                <option value="Johannesburg">Johannesburg</option>
                                <option value="Tokyo">Tokyo</option>
                                <option value="Paris">Paris</option>
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
                                <button className="add-img-btn">Upload Images</button>
                                <input type="file" className="image-upload-box" accept="image/*" require />
                            </label>
                        </div>

                        
                        <div className="inputs">
                            <label>Amenities</label>
                            <div className="amenities">
                                <input type="text" value={amenities} onChange={(e) => setAmenities(e.target.value)} required/>
                                <button className='amenities-btn'>Add</button>
                            </div>
                        </div>
                 
                        <div className="listing-btns">
                            <button type="submit" id="create-btn">Create</button>
                            <button id="cancel-btn">Cancel</button>
                        </div>
            
                    </form>
                </div>    
            </div>
        </div>
    );   
}

