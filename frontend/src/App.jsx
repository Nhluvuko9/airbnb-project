import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Locations from './pages/Locations';
import LocationDetails from './pages/LocationDetails';
import Dashboard from './pages/Dashboard';
import CreateListing from './pages/CreateListings';
import ViewListings from './pages/ViewListings';
import ViewReservations from './pages/ViewReservations';
import UpdateListings from './pages/UpdateListings';
import Homepage from './pages/Homepage';
import Header from './components/Header';
import { authService } from './services/authService';
import './App.css';

function RequireAuth({ children }) {
  const location = useLocation();
  return authService.isAuthenticated()
    ? children
    : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

function RequireRole({ roles, children }) {
  return authService.hasRole(...roles)
    ? children
    : <Navigate to="/homepage" replace />;
}

export default function App() {

  return (
    <Router>
      <div className="app-container">
        <Routes>

          <Route element={
            <>
              <Header theme="dark" isHomepage={true} />
              <div>
                <Outlet />
              </div>
            </>}>
              <Route path='/' element={<Navigate to='/homepage' replace />} />
              <Route path='/homepage' element={<Homepage />} />
          </Route>
          
          <Route path='/locations' element={<Locations />} />
          <Route path='/locations/:id' element={<LocationDetails />} />

          <Route path='/create-listing' element={<RequireAuth><RequireRole roles={['host', 'admin']}><CreateListing /></RequireRole></RequireAuth>} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<RequireAuth><RequireRole roles={['host', 'admin']}><Dashboard /></RequireRole></RequireAuth>} />
          <Route path='/view-listings' element={<RequireAuth><RequireRole roles={['host', 'admin']}><ViewListings /></RequireRole></RequireAuth>} />
          <Route path='/view-reservations' element={<RequireAuth><ViewReservations /></RequireAuth>} />
          <Route path='/update-listing/:id' element={<RequireAuth><RequireRole roles={['host', 'admin']}><UpdateListings /></RequireRole></RequireAuth>} />
          <Route path='*' element={<div className="page-container"><h1>Oops!</h1><h4>404 - Page not Found</h4></div>} />
        </Routes>
      </div>
    </Router>
  )
}


