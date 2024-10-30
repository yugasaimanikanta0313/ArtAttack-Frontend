import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserWishlist, removeFromWishlist, clearWishlist } from '../services/api';
import { IconButton, Button, Card, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Wishlist = ({ userId }) => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollRefs = useRef({});
    const [scrollLeftVisible, setScrollLeftVisible] = useState({});
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const data = await getUserWishlist(userId);
                console.log("Fetched wishlist data:", data);
                setWishlist(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchWishlist();
    }, [userId]);

    const handleRemoveFromWishlist = async (wishlistItemId) => {
        try {
            await removeFromWishlist(wishlistItemId);
            setWishlist(wishlist.filter(item => item.id !== wishlistItemId));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleClearWishlist = async () => {
        try {
            await clearWishlist(userId);
            setWishlist([]);
        } catch (err) {
            setError(err.message);
        }
    };

    const onScroll = (category) => {
        const scrollContainer = scrollRefs.current[category];
        if (scrollContainer) {
            setScrollLeftVisible((prev) => ({
                ...prev,
                [category]: scrollContainer.scrollLeft > 0,
            }));
        }
    };

    const scrollLeft = (category) => {
        scrollRefs.current[category].scrollBy({
            top: 0,
            left: -300,
            behavior: 'smooth',
        });
    };

    const scrollRight = (category) => {
        scrollRefs.current[category].scrollBy({
            top: 0,
            left: 300,
            behavior: 'smooth',
        });
    };

    const goToArtDetail = (artId) => {
        navigate(`/art/${artId}`);
    };

    if (loading) return <CircularProgress color="secondary" />;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    const groupedWishlist = wishlist.reduce((acc, item) => {
        const category = item.art?.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});

    return (
        <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px', backgroundColor: '#1b1b2f', color: '#fff', borderRadius: '15px' }}>
            <Typography variant="h4" gutterBottom style={{ color: '#FFD700' }}>
                Your Wishlist
            </Typography>
            {wishlist.length === 0 ? (
                <Typography variant="body1" style={{ color: '#b3b3b3' }}>No items in your wishlist.</Typography>
            ) : (
                Object.entries(groupedWishlist).map(([category, items]) => (
                    <div key={category} style={{ marginBottom: '30px' }}>
                        <Typography variant="h5" style={{ color: '#FFD700', marginBottom: '10px' }}>{category}</Typography>
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                            {scrollLeftVisible[category] && (
                                <IconButton onClick={() => scrollLeft(category)} style={{ position: 'absolute', left: '10px', zIndex: 1 }}>
                                    <ArrowBackIcon style={{ color: '#FFD700' }} />
                                </IconButton>
                            )}
                            <div
                                ref={(el) => (scrollRefs.current[category] = el)}
                                onScroll={() => onScroll(category)}
                                style={styles.wishlistSlider}
                            >
                                {items.map((item) => (
                                    <div 
                                        key={item.id} 
                                        style={{ display: 'inline-block', minWidth: '300px', marginRight: '10px', cursor: 'pointer' }}
                                        onClick={() => goToArtDetail(item.art.id)} // Navigate on card click
                                    >
                                        <Card style={{ backgroundColor: '#2e2e3d', borderRadius: '15px', boxShadow: '0 4px 10px rgba(255, 215, 0, 0.2)', width: '300px' }}>
                                            <CardMedia
                                                component="img"
                                                height="250"
                                                image={item.art?.pictureUrl1 || 'default.jpg'}
                                                alt={item.art?.artTitle || 'Artwork'}
                                                style={{ borderRadius: '15px 15px 0 0', objectFit: 'cover' }}
                                            />
                                            <CardContent style={{ color: '#d1d1e9' }}>
                                                <Typography variant="h6" style={{ color: '#FFD700' }}>{item.art?.artTitle || 'N/A'}</Typography>
                                                <Typography variant="body2" style={{ color: '#b3b3b3' }}>
                                                    {item.art?.description || 'No description available'}
                                                </Typography>
                                                <Typography variant="body2" style={{ marginTop: '10px', color: '#b3b3b3' }}>
                                                    Category: {item.art?.category || 'N/A'}
                                                </Typography>
                                                <Typography variant="body1" style={{ fontWeight: 'bold', marginTop: '5px', color: '#FFD700' }}>
                                                    Price: ${item.art?.price ? item.art.price.toFixed(2) : 'N/A'}
                                                </Typography>
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent triggering card click
                                                        handleRemoveFromWishlist(item.id);
                                                    }}
                                                    style={{ marginTop: '15px', color: '#FFD700' }}
                                                >
                                                    <DeleteIcon /> Remove
                                                </IconButton>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                            <IconButton onClick={() => scrollRight(category)} style={{ position: 'absolute', right: '10px', zIndex: 1 }}>
                                <ArrowForwardIcon style={{ color: '#FFD700' }} />
                            </IconButton>
                        </div>
                    </div>
                ))
            )}
            <Button
                onClick={handleClearWishlist}
                variant="contained"
                startIcon={<ClearAllIcon />}
                style={{
                    marginTop: '20px',
                    backgroundColor: '#FFD700',
                    color: '#1b1b2f',
                    borderRadius: '25px',
                    padding: '10px 20px',
                    fontWeight: 'bold',
                }}
                disabled={wishlist.length === 0}
            >
                Clear Wishlist
            </Button>
        </div>
    );
};

// Inline CSS styles for Wishlist Component
const styles = {
    wishlistSlider: {
        display: 'flex',
        overflowX: 'auto',
        scrollBehavior: 'smooth',
        padding: '20px 0',
    },
};

export default Wishlist;
