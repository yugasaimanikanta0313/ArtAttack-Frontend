// Cart.js
import React, { useEffect, useState } from 'react';
import { getArts } from '../services/api'; // Adjust the import based on your API file location

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [totalSum, setTotalSum] = useState(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            const items = await getArts(); // Fetch the cart items
            setCartItems(items); // Assuming items are stored in an array
        };

        fetchCartItems();
    }, []);

    const handleCheckboxChange = (id, price) => {
        setSelectedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));

        // Update total sum
        const newTotal = selectedItems[id] ? totalSum - price : totalSum + price;
        setTotalSum(newTotal);
    };

    const handleCheckout = () => {
        alert('Proceeding to checkout...');
        // Implement checkout logic here
    };

    return (
        <div>
            <h1>Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={!!selectedItems[item.id]}
                                        onChange={() => handleCheckboxChange(item.id, item.price)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <h3>Total: ${totalSum}</h3>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default Cart;
