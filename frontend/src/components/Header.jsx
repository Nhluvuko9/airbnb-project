import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import './App.css';

export default function Header() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/dashboard">Host Dashboard</Link>
            </div>
            <div className="nav-links">
                {user ? (
                        <div className="user-menu">
                            <span>Hello, {user.username} ({user.role})</span>
                            <Link to="/create-listings">Become a Host</Link>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </div>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </header>
    );

}
