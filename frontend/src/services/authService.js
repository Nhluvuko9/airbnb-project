const API_URL = 'https://airbnb-project-backend-dal9.onrender.com/';

export const authService = {
    // Send login credentials to backend
    login: async (username, password) => {
        const feedback = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!feedback.ok) {
            const errorMessage = "Login Failed";
            try {
                const errorData = await feedback.json();
                errorData.message || errorMessage;
            } catch {
                throw new Error(errorMessage);
            }
        }

        const data = await feedback.json();

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
