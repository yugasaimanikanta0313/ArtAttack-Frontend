import React, { useEffect, useState } from 'react';
import { getUserWishlist, removeFromWishlist } from '../services/api';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const userId = 1; // Example userId, replace with actual user data if needed
                const wishlistData = await getUserWishlist(userId);
                setWishlist(wishlistData);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        fetchWishlist();
    }, []);

    const handleRemoveFromWishlist = async (wishlistItemId) => {
        try {
            await removeFromWishlist(wishlistItemId);
            setWishlist(wishlist.filter(item => item.id !== wishlistItemId));
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    if (wishlist.length === 0) return <p>Your wishlist is empty.</p>;

    return (
        <div>
            <h2>Your Wishlist</h2>
            <ul>
                {wishlist.map(item => (
                    <li key={item.id}>
                        {item.art.artTitle}
                        <button onClick={() => handleRemoveFromWishlist(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wishlist;
