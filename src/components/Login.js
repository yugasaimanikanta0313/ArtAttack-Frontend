// import React, { useState } from 'react';
// import { login } from '../services/api';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// function Login() {
   

//     const [credentials, setCredentials] = useState({
//         email: '',
//         password: ''
//     });

//     const [isSubmitting, setIsSubmitting] = useState(false); // For loading indicator
//     const navigate = useNavigate(); // Initialize useNavigate

//     const handleChange = (e) => {
//         setCredentials({
//             ...credentials,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true); // Show loading state
//         try {
//             const response = await login(credentials);

//             const isAdmin = credentials.email === 'yugasai6300@gmail.com' && credentials.password === 'Yugasai';
//             if (isAdmin) {
//                                 navigate('/adminHome'); 
//                                 console.log(response.userId);

//                                 alert("Admin Login successful!");
//                             } else {
//                                 navigate('/userHome'); 
//                                 console.log(response.data);
//                                 alert("Login successful!");
//                             }
//             // console.log(response.data);
//             // alert("Login successful!");
//             // navigate('/userHome'); // Navigate to UserIndex on successful login
//         } catch (error) {
//             console.error(error);
//             alert("Login failed.");
//         } finally {
//             setIsSubmitting(false); // Hide loading state
//         }
//     };


//     const styles = {
//         page: {
//             backgroundColor: '#000', // Set background to black
//             height: '100vh',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             position: 'relative',
//             overflow: 'hidden',
//         },
//         wrapper: {
//             backgroundColor: '#1a1a1a', // Dark background
//             padding: '40px',
//             borderRadius: '15px',
//             boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), 0 0 50px rgba(0, 255, 255, 0.3)', // Neon glow effect
//             textAlign: 'center',
//             maxWidth: '400px',
//             width: '100%',
//             margin: 'auto',
//             position: 'relative',
//             zIndex: 1,
//         },
//         title: {
//             fontSize: '2em',
//             color: '#00f5ff', // Neon cyan
//             marginBottom: '20px',
//             textShadow: '0 0 10px rgba(0, 255, 255, 0.7)', // Glow effect
//         },
//         form: {
//             display: 'flex',
//             flexDirection: 'column',
//         },
//         label: {
//             fontSize: '1.1em',
//             color: '#fff', // White label text color
//             marginBottom: '15px',
//         },
//         input: {
//             padding: '10px',
//             fontSize: '1em',
//             borderRadius: '5px',
//             border: 'none',
//             marginTop: '5px',
//             outline: 'none',
//             backgroundColor: '#333', // Dark input background
//             color: '#fff', // White input text color
//             boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.3)', // Neon glow
//             transition: 'background 0.3s, box-shadow 0.3s',
//         },
//         inputPlaceholder: {
//             color: '#98FF98', // Mint neon effect for placeholder
//             textShadow: '0 0 5px #98FF98', // Glow effect to placeholder
//         },
//         button: {
//             backgroundColor: '#00f5ff', // Neon cyan
//             color: '#000',
//             fontSize: '1.2em',
//             padding: '10px 20px',
//             border: 'none',
//             borderRadius: '25px',
//             marginTop: '20px',
//             cursor: 'pointer',
//             transition: 'background 0.3s, transform 0.3s',
//             boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), 0 0 50px rgba(0, 255, 255, 0.3)', // Neon glow
//         },
//         buttonDisabled: {
//             backgroundColor: '#444',
//             cursor: 'not-allowed',
//         },
//         screenBackground: {
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             zIndex: 0,
//         },
//         backgroundShape1: {
//             height: '520px',
//             width: '520px',
//             background: '#00f5ff',
//             borderRadius: '50%',
//             position: 'absolute',
//             top: '-100px',
//             right: '150px',
//             zIndex: -1,
//         },
//         backgroundShape2: {
//             height: '220px',
//             width: '220px',
//             background: '#6C63AC',
//             borderRadius: '50%',
//             position: 'absolute',
//             top: '-200px',
//             right: '0',
//             zIndex: -2,
//         }
//     };

//     return (
//         <div style={styles.page}>
//             <div style={styles.wrapper}>
//                 <h2 style={styles.title}>Login</h2>
//                 {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
//                 <form style={styles.form} onSubmit={handleSubmit}>
//                     <label style={styles.label}>
//                         <input
//                             style={styles.input}
//                             type="email"
//                             name="email"
//                             value={credentials.email}
//                             onChange={handleChange}
//                             placeholder="Enter your email"
//                             required
//                         />
//                     </label>
//                     <label style={styles.label}>
//                         <input
//                             style={styles.input}
//                             type="password"
//                             name="password"
//                             value={credentials.password}
//                             onChange={handleChange}
//                             placeholder="Enter your password"
//                             required
//                         />
//                     </label>
//                     <button
//                         style={isSubmitting ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
//                         type="submit"
//                         disabled={isSubmitting}
//                     >
//                         {isSubmitting ? 'Logging in...' : 'Login'}
//                     </button>
//                 </form>
//             </div>
//             <div style={styles.screenBackground}>
//                 <div style={styles.backgroundShape1}></div>
//                 <div style={styles.backgroundShape2}></div>
//             </div>
//         </div>
//     );
// }

// export default Login;
import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { setSession } from '../utils/cookieUtils'; // Import the cookie utility

function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await login(credentials);
            const userId = response.userId; // Assuming response contains userId
            
            if (userId) {
                setSession('userId', userId, 30); // Store userId in cookies for 30 mins
            }

            // Check if userId is 1 to determine admin status
            if (userId === 1) {
                navigate('/adminHome'); 
                alert("Admin Login successful!");
            } else {
                navigate('/userHome'); 
                alert("Login successful!");
            }
        } catch (error) {
            console.error(error);
            alert("Login failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const styles = {
        page: {
            backgroundColor: '#000',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
        },
        wrapper: {
            backgroundColor: '#1a1a1a',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), 0 0 50px rgba(0, 255, 255, 0.3)',
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%',
            margin: 'auto',
            position: 'relative',
            zIndex: 1,
        },
        title: {
            fontSize: '2em',
            color: '#00f5ff',
            marginBottom: '20px',
            textShadow: '0 0 10px rgba(0, 255, 255, 0.7)',
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
            backgroundColor: '#333',
            color: '#fff',
            boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.3)',
            transition: 'background 0.3s, box-shadow 0.3s',
        },
        inputPlaceholder: {
            color: '#98FF98',
            textShadow: '0 0 5px #98FF98',
        },
        button: {
            backgroundColor: '#00f5ff',
            color: '#000',
            fontSize: '1.2em',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '25px',
            marginTop: '20px',
            cursor: 'pointer',
            transition: 'background 0.3s, transform 0.3s',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), 0 0 50px rgba(0, 255, 255, 0.3)',
        },
        buttonDisabled: {
            backgroundColor: '#444',
            cursor: 'not-allowed',
        },
        screenBackground: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
        },
        backgroundShape1: {
            height: '520px',
            width: '520px',
            background: '#00f5ff',
            borderRadius: '50%',
            position: 'absolute',
            top: '-100px',
            right: '150px',
            zIndex: -1,
        },
        backgroundShape2: {
            height: '220px',
            width: '220px',
            background: '#6C63AC',
            borderRadius: '50%',
            position: 'absolute',
            top: '-200px',
            right: '0',
            zIndex: -2,
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.wrapper}>
                <h2 style={styles.title}>Login</h2>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <label style={styles.label}>
                        <input
                            style={styles.input}
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </label>
                    <label style={styles.label}>
                        <input
                            style={styles.input}
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </label>
                    <button
                        style={isSubmitting ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
            <div style={styles.screenBackground}>
                <div style={styles.backgroundShape1}></div>
                <div style={styles.backgroundShape2}></div>
            </div>
        </div>
    );
}

export default Login;
