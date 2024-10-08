// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaUser, FaLock, FaArrowRight } from 'react-icons/fa';
// import { Adminlogin } from '../services/api'; // Import the Adminlogin function from your api file

// function AdminLogin() {
//     const [username, setUsername] = useState('');  // Changed 'email' to 'username'
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();  // Prevent default form submission
        
//         const loginDto = { username, password };  // Use username instead of email

//         try {
//             console.log(loginDto); 
//             const response = await Adminlogin(loginDto);  // Use the Adminlogin function instead of fetch
      
//             if (response.data.status === "success") {
//                 // Navigate to admin index
//                 navigate("/adminIndex");
//             } else {
//                 // Display error message
//                 setError(response.data.message);
//             }
//         } catch (error) {
//             console.error("An error occurred:", error);
//             setError("Login failed. Please try again.");
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <div style={styles.screen}>
//                 <div style={styles.screenContent}>
//                     <form onSubmit={handleLogin} style={styles.form}>
//                         {error && <p style={styles.error}>{error}</p>}
//                         <div style={styles.headerContainer}>
//                             <h1 style={styles.header}>Admin Login</h1>
//                         </div>
//                         <div style={styles.inputGroup}>
//                             <FaUser style={styles.icon} />
//                             <input
//                                 type="text"  // Changed type to 'text' for username
//                                 value={username}  // Use username state
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 required
//                                 style={styles.input}
//                                 placeholder="Username"  // Update placeholder to 'Username'
//                             />
//                         </div>
//                         <div style={styles.inputGroup}>
//                             <FaLock style={styles.icon} />
//                             <input
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                                 style={styles.input}
//                                 placeholder="Password"
//                             />
//                         </div>
//                         <button type="submit" style={styles.button}>
//                             Login <FaArrowRight style={styles.buttonIcon} />
//                         </button>
//                     </form>
//                 </div>
//                 <div style={styles.background}>
//                     <span style={styles.backgroundShape4}></span>
//                     <span style={styles.backgroundShape3}></span>
//                     <span style={styles.backgroundShape2}></span>
//                     <span style={styles.backgroundShape1}></span>
//                 </div>
//             </div>
//         </div>
//     );
// }

// const styles = {
//     // Styles remain unchanged from your original code
//     container: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#000',
//     },
//     headerContainer: {
//         textAlign: 'center',
//         color: '#00CCDD',
//     },
//     screen: {
//         position: 'relative',
//         background: '#1a1a1a',
//         width: '350px',
//         padding: '40px',
//         borderRadius: '15px',
//         boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), 0 0 50px rgba(0, 255, 255, 0.3)',
//         overflow: 'hidden',
//     },
//     screenContent: {
//         position: 'relative',
//         zIndex: 1,
//     },
//     form: {
//         display: 'flex',
//         flexDirection: 'column',
//     },
//     error: {
//         color: 'red',
//         marginBottom: '15px',
//     },
//     inputGroup: {
//         position: 'relative',
//         marginBottom: '20px',
//     },
//     icon: {
//         position: 'absolute',
//         top: '50%',
//         left: '10px',
//         transform: 'translateY(-50%)',
//         color: 'rgba(0, 255, 255, 0.8)',
//         fontSize: '20px',
//     },
//     input: {
//         width: '100%',
//         maxWidth: '300px',
//         padding: '10px 40px',
//         paddingLeft: '40px',
//         backgroundColor: '#1c1c1c',
//         border: 'none',
//         borderRadius: '5px',
//         color: '#fff',
//         fontSize: '1em',
//         boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.3)',
//         transition: '0.3s',
//     },
//     button: {
//         width: '100%',
//         padding: '15px',
//         background: '#00f5ff',
//         color: '#000',
//         fontWeight: 'bold',
//         textTransform: 'uppercase',
//         border: 'none',
//         borderRadius: '25px',
//         cursor: 'pointer',
//         boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), 0 0 50px rgba(0, 255, 255, 0.3)',
//         transition: 'background 0.3s, transform 0.3s',
//     },
//     buttonIcon: {
//         fontSize: '20px',
//         marginLeft: 'auto',
//     },
//     background: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         zIndex: 0,
//     },
//     backgroundShape1: {
//         height: '520px',
//         width: '520px',
//         background: '#fff',
//         top: '-50px',
//         right: '120px',
//         borderRadius: '0 72px 0 0',
//         transform: 'rotate(45deg)',
//         position: 'absolute',
//     },
//     backgroundShape2: {
//         height: '220px',
//         width: '220px',
//         background: '#6C63AC',
//         top: '-172px',
//         right: '0',
//         borderRadius: '32px',
//         transform: 'rotate(45deg)',
//         position: 'absolute',
//     },
//     backgroundShape3: {
//         height: '540px',
//         width: '190px',
//         background: 'linear-gradient(270deg, #00f5ff, #00c3ff)',
//         top: '-24px',
//         right: '0',
//         borderRadius: '32px',
//         transform: 'rotate(45deg)',
//         position: 'absolute',
//     },
//     backgroundShape4: {
//         height: '400px',
//         width: '200px',
//         background: '#7E7BB9',
//         top: '420px',
//         right: '50px',
//         borderRadius: '60px',
//         transform: 'rotate(45deg)',
//         position: 'absolute',
//     },
// };

// export default AdminLogin;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/admin/login", null, {
        params: { username, password },
      });
      if (response.status === 200) {
        navigate("/adminIndex");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AdminLogin;
