import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import CreateListing from './pages/CreateListings';
import ViewListings from './pages/ViewListings';
import UpdateListings from './pages/UpdateListings';
import Dashboard from './pages/Dashboard';
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
              <Route path='/create-listing' element={<CreateListing />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/view-listings' element={<ViewListings />} />
          <Route path='/update-listing/:id' element={<UpdateListings />} />
          <Route path='*' element={<div className="page-container"><h1>Oops!</h1><h4>404 - Page not Found</h4></div>} />
        </Routes>
      </div>
    </Router>
  )
}


