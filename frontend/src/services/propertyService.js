const API_URL = 'http://localhost:5000/api/properties';

export const propertyService = {
    create: async (formDataPayload) => {
        const token = localStorage.getItem('token');

        try {
            const feedback = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Authorization' : `Bearer ${token}` },
                body: formDataPayload
            });
    
            // const data = await feedback.json();
    
            if (!feedback.ok) throw new Error(`Server error: ${feedback.status}`);
            return await feedback.json();
        } catch (error) {
            console.error("An error occurred while saving the listing.", error);
            throw error;
        }
    },

    getAll: async () => {
        const feedback = await fetch(API_URL);
        const data = await feedback.json();

        if (!feedback.ok) {
            throw new Error(data.message || "Failed to save and upload listing.");
        }
        return data;
    },

    getById: async (id) => {
        const feedback = await fetch(`${API_URL}/${id}`);
        const data = await feedback.json();

        if (!feedback.ok) {
            throw new Error(data.message || "Failed to fetch property details.");
        }
        return data;
    },

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
