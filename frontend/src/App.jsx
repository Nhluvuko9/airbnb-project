import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CreateListing from './pages/CreateListings';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import './App.css';

export default function App() {

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path='/' element={<Navigate to='/homepage' replace />} />
          <Route path='/homepage' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='*' element={<div className="page-container"><h1>Oops!</h1><h4>404 - Page not Found</h4></div>} />
        </Routes>
      </div>
    </Router>
 
  )
}


