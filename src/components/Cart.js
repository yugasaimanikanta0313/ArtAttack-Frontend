import React, { useEffect, useState } from 'react';
import { getUserCart, updateCartItem, removeFromCart, clearUserCart } from '../services/api';
import { getSession } from '../utils/cookieUtils';
import { IconButton, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const userId = getSession('userId');
    const [quantities, setQuantities] = useState({}); // State to store quantities

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!userId) return;
            try {
                const items = await getUserCart(userId);
                setCartItems(items);
                const initialQuantities = {};
                items.forEach(item => {
                    initialQuantities[item.id] = item.quantity; // Initialize quantities state
                });
                setQuantities(initialQuantities);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, [userId]);

    const handleUpdateQuantity = async (itemId) => {
        const quantity = quantities[itemId];
        if (quantity < 1) return; // Prevent updating to less than 1
        try {
            const updatedItem = await updateCartItem(userId, itemId, quantity);
            setCartItems(prevItems => 
                prevItems.map(item => item.id === itemId ? updatedItem : item)
            );
        } catch (error) {
            console.error("Error updating cart item quantity:", error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await removeFromCart(itemId); // Remove item directly by its ID
            setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Error removing cart item:", error);
        }
    };

    const handleClearCart = async () => {
        try {
            await clearUserCart(userId);
            setCartItems([]);
            setQuantities({}); // Clear quantities
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price * (quantities[item.id] || 0); // Calculate total based on quantities
        }, 0);
    };

    const handleCheckout = () => {
        alert("Proceeding to checkout...");
    };

    return (
        <div style={{ 
            backgroundColor: '#2C2C2C', 
            color: '#FFF', 
            padding: '20px', 
            borderRadius: '8px',
            minHeight: '100vh', // Ensures the cart occupies full viewport height
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <Typography variant="h4" gutterBottom>Your Cart</Typography>
            {cartItems.length === 0 ? (
                <Typography>No items in your cart.</Typography>
            ) : (
                <TableContainer component={Paper} style={{ backgroundColor: '#3A3A3A' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: '#FFF' }}>Image</TableCell> {/* New Image Column */}
                                <TableCell style={{ color: '#FFF' }}>Art Title</TableCell>
                                <TableCell style={{ color: '#FFF' }}>Price</TableCell>
                                <TableCell style={{ color: '#FFF' }}>Quantity</TableCell>
                                <TableCell style={{ color: '#FFF' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <img 
                                           src={item.art?.pictureUrl1 || 'default.jpg'} // Access the picture URL correctly
                                           alt={item.art?.artTitle || 'Artwork'}
                                            style={{ width: '60px', height: '60px', borderRadius: '4px' }} // Adjust image size and shape
                                        />
                                    </TableCell>
                                    <TableCell style={{ color: '#FFF' }}>{item.artTitle}</TableCell>
                                    <TableCell style={{ color: '#FFF' }}>${item.price.toFixed(2)}</TableCell>
                                    <TableCell style={{ color: '#FFF' }}>
                                        <input
                                            type="number"
                                            min="0" // Prevents negative values in the input field
                                            value={quantities[item.id]}
                                            onChange={(e) => {
                                                const newQuantity = parseInt(e.target.value);
                                                if (newQuantity >= 0) { // Ensure quantity is not negative
                                                    setQuantities(prev => ({ ...prev, [item.id]: newQuantity }));
                                                }
                                            }}
                                            style={{ width: '60px', marginRight: '5px', backgroundColor: '#444', color: '#FFF', border: 'none', borderRadius: '4px', padding: '5px' }}
                                        />
                                        <Button variant="contained" color="primary" onClick={() => handleUpdateQuantity(item.id)}>Save</Button>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleRemoveItem(item.id)} color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {cartItems.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h5">Total: ${calculateTotal().toFixed(2)}</Typography>
                    <Button variant="contained" color="secondary" onClick={handleClearCart} style={{ marginRight: '10px' }}>Clear Cart</Button>
                    <Button variant="contained" color="success" onClick={handleCheckout}>Checkout</Button>
                </div>
            )}
        </div>
    );
};

export default Cart;
