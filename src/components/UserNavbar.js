import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Material-UI Menu Icon
import { Menu, MenuItem, IconButton } from '@mui/material'; // Material-UI Components
import '../styles/AdminNavbar.css'; // Import the CSS for Navbar styling

const UserNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage the dropdown

  // Function to open the dropdown menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar">
      {/* <h2 className="navbar-title">Admin Dashboard</h2> */}
      {/* <Link to="/shop" >shop</Link> */}
      <IconButton
        edge="end"
        color="inherit"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
        className="menu-icon"
        style={{ marginRight: '20px' }} 
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      {/* Dropdown menu */}
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link to="/cart" className="menu-link">cart</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/userviewarts" className="menu-link">View Art</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/wishlist" className="menu-link">wishlist</Link>
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default UserNavbar;
