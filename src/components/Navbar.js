// src/pages/HomePage.js
import React from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component
import './Homepage.css';

function HomePage() {
    return (
        <div className="homepage-container">
            <Navbar /> {/* Use Navbar component here */}
            <div className="content">
                {/* Add other content here */}
            </div>
        </div>
    );
}

export default HomePage;
