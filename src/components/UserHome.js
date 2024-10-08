import React from 'react';
import UserNavbar from './UserNavbar';
// import { useNavigate } from 'react-router-dom';

function UserHome() {
    // const navigate = useNavigate();

    // const handleLogout = () => {
    //     // Logic for logging out (e.g., clearing tokens)
    //     navigate('/login');
    // };

    return (
        <div style={styles.page}>
            {/* <h1 style={styles.title}>User Dashboard</h1>
            <p style={styles.text}>Welcome, User! Explore your dashboard and manage your profile here.</p>
            <button style={styles.button} onClick={handleLogout}>Logout</button> */}
            <UserNavbar/>
        </div>
    );
}

const styles = {
    page: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        color: '#fff',
    },
    title: {
        fontSize: '3rem',
        color: '#00f5ff',
        textShadow: '0 0 10px rgba(0, 255, 255, 0.7)',
    },
    text: {
        fontSize: '1.2rem',
        marginBottom: '20px',
    },
    button: {
        backgroundColor: '#00f5ff',
        color: '#000',
        fontSize: '1.2rem',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
    },
};

export default UserHome;
