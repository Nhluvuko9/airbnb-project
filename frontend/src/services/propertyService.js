const API_URL = 'http://localhost:5000/api/properties';

export const propertyService = {
    create: async (propertyDetails) => {
        const token = localStorage.getItem('token');

        const feedback = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-type' : 'application/json', 'Authorization' : `Bearer ${token}`},
            body: JSON.stringify({ propertyDetails }),
        });

        const data = await feedback.json();

        if (!feedback.ok) {
            throw new Error(data.message || "Failed to save and upload listing.");
        }
        return data;
    },

    getAll: async () => {
        const feedback = await fetch(API_URL);
        const data = await feedback.json();

        if (!feedback.ok) {
            throw new Error(data.message || "Failed to save and upload listing.");
        }
        return data;
    }
};

