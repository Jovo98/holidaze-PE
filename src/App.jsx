import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages (update paths based on actual filenames)
import HomePage from './pages/HomePage.jsx';          // List of all venues (home)
import VenueDetailsPage from './pages/VenueDetailsPage.jsx';    // Specific venue details
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UserProfilePage from './pages/UserProfilePage.jsx';
import ManageVenues from './pages/ManageVenues.jsx';



function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} /> {/* Home shows venue list */}
                <Route path="/venues/:id" element={<VenueDetailsPage />} /> {/* Dynamic for venue details */}
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/manage-venues" element={<ManageVenues />} />
                {/* More routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
