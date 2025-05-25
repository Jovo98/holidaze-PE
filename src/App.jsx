import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import VenueDetailsPage from './pages/VenueDetailsPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UserProfilePage from './pages/UserProfilePage.jsx';
import {Box} from "@mui/material";
import Footer from './components/Footer'
function App() {

    return (

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
        <Box>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/venues/:id" element={<VenueDetailsPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
            </Routes>
        </Router>
        </Box>
    <Footer />
</Box>
    );
}

export default App;
