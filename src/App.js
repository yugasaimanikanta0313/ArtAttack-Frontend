import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import Verify from './components/Verify';
import Success from './components/Success';
import AboutUs from './components/AboutUs';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';
import AddArt from './components/AddArt';
import ViewArts from './components/ViewArts';
import ViewArt from './components/ViewArt';
import UpdateArt from './components/UpdateArt';
// import { Shop } from '@mui/icons-material';
// import AdminNavbar from './components/AdminNavbar';
import Shop from './components/shop';
import UserViewArts from './components/UserViewArts';
import UserViewArt from './components/UserViewArt';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';

function App() {
    return (
        <Router>
             {/* <AdminNavbar /> */}
            <div>
           
                <Routes>
                    <Route  path="/" element={<HomePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/success" element={<Success />} />
                    {/* <Route path="/userIndex" element={<UserIndex />} /> */}
                    <Route path="/aboutUs" element={<AboutUs />} />
                    <Route path='/admin-login' element={<AdminLogin/>}/>
                    <Route path="/adminHome" element={<AdminHome />} />
                    <Route path="/userHome" element={<UserHome />} />
                    <Route path='/shop' element={<Shop/>}/>
                    <Route path='/userviewarts' element={<UserViewArts/>}/>
                    <Route path='/userviewart/:artId' element={<UserViewArt/>}/>
                    <Route path="/wishlist/:userId" element={<Wishlist/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    
                    <Route path="/add-art" element={<AddArt />} />
                    <Route path="/view-art" element={<ViewArts />} />
                    <Route path="/view-art/:artId" element={<ViewArt />} />
                     <Route path="/arts/update/:artId" element={<UpdateArt />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
