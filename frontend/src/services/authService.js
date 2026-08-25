const API_URL = 'http://localhost:5173/api/auth';

export const authService = {
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

        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};