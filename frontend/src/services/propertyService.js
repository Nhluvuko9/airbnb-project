// PROPERTY API TRANSIT ENGINE//

const API_URL = 'http://localhost:5000/api/properties';

export const propertyService = {

    // CREATE Operation
    // Submits formData (raw text and images)
    create: async (formDataPayload) => {
        const token = localStorage.getItem('token');

        try {
            const feedback = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Authorization' : `Bearer ${token}` },
                body: formDataPayload
            });
        
            if (!feedback.ok) throw new Error(`Server error: ${feedback.status}`);
            return await feedback.json();
        } catch (error) {
            console.error("An error occurred while saving the listing.", error);
            throw error;
        }
    },

    // READ Operation
    // Pulls array of all listed item in MongoDB
    getAll: async () => {
        const feedback = await fetch(API_URL);
        const data = await feedback.json();

        if (!feedback.ok) {
            throw new Error(data.message || "Failed to save and upload listing.");
        }
        return data;
    },

    // READ Operation (detailed)
    // Pulls single property document model
    getById: async (id) => {
        const feedback = await fetch(`${API_URL}/${id}`);
        const data = await feedback.json();

        if (!feedback.ok) {
            throw new Error(data.message || "Failed to fetch property details.");
        }
        return data;
    },

    // UPDATE Operation
    // Edits existing layout data models
    update: async (id, propertyDetails) => {
        const token = localStorage.getItem('token');

        const feedback = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-type' : 'application/json', 'Authorization' : `Bearer ${token}`},
            body: JSON.stringify({ propertyDetails }),
        });

        const data = await feedback.json();

        if (!feedback.ok) {
            throw new Error(data.message || "Failed to update property details.");
        }
        return data;
    },

    // DELETE Operation
    // Targets specific model by their MongoDB_id key and removes irem from system
    delete: async (id) => {
        const token = localStorage.getItem('token');

        const feedback = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization' : `Bearer ${token}`},
        });

        const data = await feedback.json();

        if (!feedback.ok) {
            throw new Error(data.message || "Failed to delete property.");
        }
        return data;
    }
};
