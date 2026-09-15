const API_URL = 'https://airbnb-capstoneproject-backend.onrender.com';

export const authService = {
    // Send login credentials to backend
    login: async (username, password) => {
        const feedback = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await feedback.json();

        if (!feedback.ok) {
            throw new Error(data.message || 'Login failed');
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
    },

    getCurrentUser: () => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return null;

        try {
            return JSON.parse(storedUser);
        } catch {
            authService.logout();
            return null;
        }
    },

    isAuthenticated: () => Boolean(localStorage.getItem('token')),

    hasRole: (...roles) => {
        const user = authService.getCurrentUser();
        return Boolean(user && roles.includes(user.role));
    }
};
