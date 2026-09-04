const API_URL = 'https://airbnb-project-backend-dal9.onrender.com/';

export const authService = {
    // Send login credentials to backend
    login: async (username, password) => {
        const feedback = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-type' : 'application/json'},
            body: JSON.stringify({ username, password }),
        });

        const data = await feedback.json();
        if (!feedback.ok) {
            throw new Error(data.message || "Login failed.");
        }

        // Save token and user details
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    },

    // Clear session data
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};
