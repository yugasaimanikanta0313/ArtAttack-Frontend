import React, { useEffect, useState } from 'react';
import { getArts, getCategories } from '../services/api'; 
import UserNavbar from './UserNavbar';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getSession } from '../utils/cookieUtils'; // import session utility
import { addToWishlist } from '../services/api'; // import addToWishlist function

const UserViewArts = () => {
    const [arts, setArts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredArts, setFilteredArts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        categories: [],
        priceRange: {
            lower: '',
            upper: '',
        },
    });
    const navigate = useNavigate(); 
    const userId = getSession('userId'); // Get userId from session

    useEffect(() => {
        const fetchArts = async () => {
            try {
                const artsData = await getArts();
                setArts(artsData);
                setFilteredArts(artsData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching art items');
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchArts();
        fetchCategories();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "categories") {
            setFilters({
                ...filters,
                categories: checked
                    ? [...filters.categories, value]
                    : filters.categories.filter(category => category !== value),
            });
        } else {
            setFilters({
                ...filters,
                priceRange: {
                    ...filters.priceRange,
                    [name]: value,
                }
            });
        }
    };

    const applyFilters = (e) => {
        e.preventDefault();
        
        const { lower, upper } = filters.priceRange;
        const lowerLimit = parseFloat(lower) || 0;
        const upperLimit = parseFloat(upper) || Infinity;

        const filtered = arts.filter((art) => {
            const matchesCategory = filters.categories.length === 0 || filters.categories.includes(art.category);
            const matchesPrice = art.price >= lowerLimit && art.price <= upperLimit;
            return matchesCategory && matchesPrice;
        });

        setFilteredArts(filtered);
    };

    const handleViewClick = (artId) => {
        console.log(`View art with ID: ${artId}`);
        navigate(`/art/${artId}`);
    };

    const handleAddToWishlist = async (artId) => {
        try {
            if (!userId) {
                alert("User not logged in. Please log in to add items to your wishlist.");
                navigate('/login');
                return;
            }

            await addToWishlist(userId, artId); // Add to wishlist with userId and artId
            alert("Item has been added to your wishlist.");
        } catch (error) {
            console.error("Error adding to wishlist", error);
            alert("Failed to add to wishlist. Please try again.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
        <UserNavbar />
        <div className="view-arts-container">
            <style>
            {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

                .view-arts-container {
                    display: flex;
                    padding: 10px;
                    background-color: #121212; /* Set background color */
                    color: white;
                    min-height: 100vh;
                    font-family: 'Roboto', sans-serif;
                    position: relative; /* Ensure it positions properly */
                    overflow: hidden; /* Prevent overflow */
                    z-index: 1; /* Ensure content is above background */
                }

                .view-arts-container::before {
                    content: '';
                    position: fixed; /* Keep the background fixed */
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #121212; /* Background color */
                    z-index: -1; /* Send the background behind other content */
                }

                .filter-section {
                    flex: 0 0 25%; /* Fixed width for the filter section */
                    min-height: 500px; /* Set a minimum height */
                    padding: 20px;
                    background-color: #00CCDD;
                    border-radius: 10px;
                    z-index: 1; /* Ensure it's above the background */
                }

                .arts-list {
                    flex: 1; /* Allow arts list to grow and take available space */
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    padding: 20px;
                    z-index: 1; /* Ensure it's above the background */
                }

                .art-card {
                    position: relative;
                    flex-basis: calc(50% - 20px);
                    max-width: 45%;
                    height: 500px;
                    border-radius: 10px;
                    padding: 5px;
                    background-color: #1e1e1e;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .art-card img {
                    width: 100%;
                    height: 300px;
                    object-fit: contain;
                    border-radius: 10px;
                    margin-bottom: 15px;
                    background-color: #000;
                }

                .art-card h3, .art-card p {
                    margin: 0;
                    margin-bottom: 10px;
                    text-align: center;
                }

                .view-button {
                    padding: 10px 20px;
                    background-color: #4facfe;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    align-self: center;
                    transition: background-color 0.3s ease;
                }

                .view-button:hover {
                    background-color: #ff6ec4;
                }

                .wishlist-icon {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background-color: rgba(0, 0, 0, 0.6);
                    border-radius: 50%;
                    transition: background-color 0.3s ease;
                }

                .wishlist-icon:hover {
                    background-color: #0D92F4; /* Lighter red for hover */
                }

                /* Media query for responsive design */
                @media (max-width: 768px) {
                    .view-arts-container {
                        flex-direction: column; /* Stack elements vertically */
                    }
                    .filter-section {
                        flex: 0 0 auto; /* Allow filter section to resize based on content */
                        margin-bottom: 20px; /* Add spacing between sections */
                    }
                    .art-card {
                        flex-basis: calc(100% - 20px); /* Full width for small screens */
                        max-width: 100%; /* Ensure max width is 100% */
                    }
                }
            `}
            </style>

            <div className="filter-section">
                <h2>Filters</h2>
                <form onSubmit={applyFilters}>
                    <div>
                        <h3>Category</h3>
                        {categories.map((category, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    name="categories"
                                    value={category}
                                    checked={filters.categories.includes(category)}
                                    onChange={handleFilterChange}
                                />
                                {category}
                            </label>
                        ))}
                    </div>

                    <div>
                        <h3>Price Range</h3>
                        <label>
                            Lower limit:
                            <input
                                type="number"
                                name="lower"
                                value={filters.priceRange.lower}
                                onChange={handleFilterChange}
                                placeholder="Min price"
                            />
                        </label>
                        <br />
                        <label>
                            Upper limit:
                            <input
                                type="number"
                                name="upper"
                                value={filters.priceRange.upper}
                                onChange={handleFilterChange}
                                placeholder="Max price"
                            />
                        </label>
                    </div>
                    
                    <button type="submit">Apply Filters</button>
                </form>
            </div>

            <div className="arts-list">
                {filteredArts.length > 0 ? (
                    filteredArts.map((art) => (
                        <div key={art.id} className="art-card">
                            <h3>{art.artTitle}</h3>
                            <p>{art.description}</p>
                            <p>Category: {art.category}</p>
                            <p>Price: ${art.price.toFixed(2)}</p>
                            <div className="image-gallery">
                                <img src={art.pictureUrl1} alt={art.artTitle} />
                            </div>
                            <div>
                                <IconButton 
                                    className="wishlist-icon" 
                                    onClick={() => handleAddToWishlist(art.id)}
                                >
                                    <FavoriteIcon />
                                </IconButton>
                                <button className="view-button" onClick={() => handleViewClick(art.id)}>
                                    View
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No arts found.</p>
                )}
            </div>
        </div>
        </>
    );
};

export default UserViewArts;
