import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown
    const navigate = useNavigate();

    // Start the countdown on component mount
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(timer); // Cleanup the interval
        } else {
            alert("Time expired! Please try again.");
            navigate('/register'); // Redirect to registration if time expires
        }
    }, [timeLeft, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpData = { email, otp };

        axios.put('/verify', otpData)
            .then(response => {
                if (response.data.success) {
                    alert(response.data.message);
                    navigate('/login');
                } else {
                    alert(response.data.message);
                }
            })
            .catch(error => {
                console.error('Verification Error:', error.response ? error.response.data : error.message);
                alert("An error occurred during verification. Please try again.");
            });
    };

    const styles = {
        page: {
            backgroundColor: '#000',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        wrapper: {
            background: 'linear-gradient(145deg, #ff00cc, #3333ff)',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%',
            margin: '0 auto',
            border: '1px solid #444',
        },
        title: {
            fontSize: '2.5em',
            color: '#fff',
            marginBottom: '20px',
            textShadow: '0 0 10px #ff00cc, 0 0 20px #3333ff',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            fontSize: '1.1em',
            color: '#fff',
            marginBottom: '15px',
        },
        input: {
            padding: '10px',
            fontSize: '1em',
            borderRadius: '5px',
            border: 'none',
            marginTop: '5px',
            outline: 'none',
            backgroundColor: '#222',
            color: '#fff',
        },
        button: {
            backgroundColor: '#007bff',
            color: '#fff',
            fontSize: '1.2em',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            marginTop: '20px',
            cursor: 'pointer',
            transition: '0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        timer: {
            color: '#fff',
            fontSize: '1.2em',
            marginTop: '15px',
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.wrapper}>
                <h2 style={styles.title}>Email Verification</h2>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <label style={styles.label}>
                        <input
                            style={styles.input}
                            type="email"
                            value={email}
                            placeholder='Enter your email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label style={styles.label}>
                        <input
                            style={styles.input}
                            type="text"
                            value={otp}
                            placeholder='Enter OTP'
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </label>
                    <button
                        style={styles.button}
                        type="submit"
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                    >
                        Verify
                    </button>
                </form>
                <div style={styles.timer}>
                    {timeLeft > 0 ? (
                        <span>Time remaining: {timeLeft}s</span>
                    ) : (
                        <span>Time expired!</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Verify;
