import axios from 'axios';

// Base API instance with common settings
const api = axios.create({
    baseURL: 'http://localhost:8080', // Base URL for the API
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to handle API errors
const handleApiError = (error) => {
    if (error.response) {
        console.error('API Error:', error.response.data);
        throw new Error(error.response.data.message || 'An error occurred');
    } else {
        console.error('API Error:', error.message);
        throw new Error('Network error: ' + error.message);
    }
};

// API functions

// Register a new user
export const register = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Log in a user
export const login = async (loginData) => {
    try {
        const response = await api.post('/login', loginData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Verify account with OTP
export const verifyAccount = async (otpData) => {
    try {
        const response = await api.put('/verify', otpData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Regenerate OTP
export const regenerateOtp = async (email) => {
    try {
        const response = await api.put('/regenerate-otp', { email });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Add art
const API_URL = 'http://localhost:8080/arts'; // Your Spring Boot API endpoint

export const addArt = async (formData) => {
    try {
        const response = await api.post(`${API_URL}/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fetch all art items
export const getArts = async () => {
    try {
        const response = await api.get(`${API_URL}/all`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get categories
export const getCategories = async () => {
    const response = await api.get('http://localhost:8080/arts/categories');
    return response.data;
};

// Get art by ID
export const getArtById = async (id) => {
    const response = await fetch(`http://localhost:8080/arts/${id}`);
    const data = await response.json();
    return data;
};

// Delete art by ID
export const deleteArtById = async (id) => {
    try {
        await api.delete(`${API_URL}/${id}`); // Ensure this endpoint matches the backend
    } catch (error) {
        console.error('Error deleting art:', error);
        throw error; // Ensure this is caught in the frontend
    }
};

// Update art by ID
export const updateArtById = async (id, updatedData) => {
    try {
        const response = await api.put(`${API_URL}/update/${id}`, updatedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating art:', error);
        throw error;
    }
};

// Wishlist functions
const WISHLIST_URL = '/wishlist'; // Use relative URL based on baseURL

// Add item to wishlist
// export const addToWishlist = async (userId, artId) => {
//     try {
//         const response = await api.post(`${WISHLIST_URL}/add/${userId}`, { id: artId });
//         return response.data; // Return newly added wishlist item
//     } catch (error) {
//         handleApiError(error);
//     }
// };
// export const addToWishlist = async (userId, artId) => {
//     try {
//         const response = await fetch(`${WISHLIST_URL}/add/${userId}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ id: artId }) // Sending the artId in the request body as JSON
//         });

//         if (!response.ok) {
//             throw new Error('Failed to add to wishlist');
//         }

//         const data = await response.json(); // Parse the response JSON
//         return data; // Return newly added wishlist item
//     } catch (error) {
//         console.error('Error adding to wishlist:', error);
//         throw error;
//     }
// };
// Add art to the user's wishlist
export const addToWishlist = async (userId, artId) => {
    try {
        const response = await api.post(`${WISHLIST_URL}/add/${userId}`, { id: artId });
        return response.data; // Return the newly added wishlist item
    } catch (error) {
        handleApiError(error); // Handle any API errors
    }
};


// export const addToWishlist = async (userId, artId) => {
//     const response = await fetch(`http://localhost:8080/wishlist/?userId=${userId}&artId=${artId}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });

//     if (!response.ok) {
//         throw new Error('Failed to add to wishlist');
//     }

//     return response.json();
// };
// export const addToWishlist = async (userId, artId) => {
//     try {
//         const response = await api.post(`${WISHLIST_URL}/add/${userId}`, { artId });
//         return response.data; // Return newly added wishlist item
//     } catch (error) {
//         handleApiError(error);
//     }
// };




// export const getUserWishlist = async (userId) => {
//     try {
//         const response = await api.get(`${WISHLIST_URL}/user/${userId}`);
//         return response.data;
//     } catch (error) {
//         handleApiError(error);
//     }
// };
// Get user's wishlist
export const getUserWishlist = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/wishlist/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    };
};

export const removeFromWishlist = async (wishlistItemId) => {
    try {
        await api.delete(`${WISHLIST_URL}/remove/${wishlistItemId}`);
    } catch (error) {
        handleApiError(error);
    }
};

export const clearWishlist = async (userId) => {
    try {
        await api.delete(`${WISHLIST_URL}/clear/${userId}`);
    } catch (error) {
        handleApiError(error);
    }
};

// Cart functions
const CART_URL = 'http://localhost:8080/cart';

export const addToCart = async (userId, art) => {
    try {
        const response = await api.post(`${CART_URL}/add/${userId}`, art);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getUserCart = async (userId) => {
    try {
        const response = await api.get(`${CART_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const removeFromCart = async (cartItemId) => {
    try {
        await api.delete(`${CART_URL}/remove/${cartItemId}`);
    } catch (error) {
        handleApiError(error);
    }
};

export const clearCart = async (userId) => {
    try {
        await api.delete(`${CART_URL}/clear/${userId}`);
    } catch (error) {
        handleApiError(error);
    }
};

export default api;