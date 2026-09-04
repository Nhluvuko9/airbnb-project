import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Locations from './pages/Locations';
import LocationDetails from './pages/LocationDetails';
import CreateListing from './pages/CreateListings';
import ViewListings from './pages/ViewListings';
import ViewReservations from './pages/ViewReservations';
import UpdateListings from './pages/UpdateListings';
import Homepage from './pages/Homepage';
import Header from './components/Header';
import './App.css';

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

          <Route element={
            <>
              <Header theme="light" isHomepage={false} />
              <div>
                <Outlet />
              </div>
            </>}>
            <Route path='/locations' element={<Locations />} />
            <Route path='/locations/:id' element={<LocationDetails />} />
          </Route>

          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/view-listings' element={<ViewListings />} />
          <Route path='/view-reservations' element={<ViewReservations />} />
          <Route path='/update-listing/:id' element={<UpdateListings />} />
          <Route path='*' element={<div className="page-container"><h1>Oops!</h1><h4>404 - Page not Found</h4></div>} />
        </Routes>
      </div>
    </Router>
  )
}


