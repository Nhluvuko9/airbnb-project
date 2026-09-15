import { Link } from 'react-router-dom';
import './HeaderLight.css';

export default function HeaderLight() {
    return (
        // Light themed header without search section
        <header id="header-container">
            {/* Logo links back to homepage */}
            <div id="logo">
                <Link to="/homepage">
                    <img src="/assets/airbnb-pink-logo.jpg" alt="Airbnb logo"/>
                </Link>
            </div>
                              
            <div className="user-info">
                <i className="material-icons" style={{color: 'black'}}>dehaze</i>
                <Link to="/login" style={{color: '#aaaaaa', padding: '2.5px 0 0 4.5px'}}><i className="material-icons">account_circle</i></Link>
            </div>    
            
        </header>
    )
}