import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Cart.css';
import Icon from '../icons/xmark.svg';
import Dashboard from './dashboard'; // Top bar component
import BuyPortalSidebar from '../components/BuySidebar'; // Sidebar component

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const userId = sessionStorage.getItem('UserId');
    console.log('User ID:', userId);
    axios.post(`${process.env.REACT_APP_API_URL}/getCartItems`, { userId })
      .then(res => {
        setCartItems(res.data.cartItems);
        console.log('Cart items:', res.data.cartItems);
        calculateTotalPrice(res.data.cartItems);
      })
      .catch(err => alert(err.response?.data?.error || 'Failed to fetch cart items'));
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
    setTotalPrice(total);
  };

  const handleDelete = (cartId) => {
    axios.post(`${process.env.REACT_APP_API_URL}/deleteCartItems`, { cartIds: [cartId] })
      .then(() => {
        const updatedCartItems = cartItems.filter(item => item.cart_id !== cartId);
        setCartItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems);
        alert('Item removed from cart successfully');
      })
      .catch(err => alert(err.response?.data?.error || 'Failed to remove item'));
  };

  const handleViewProduct = (productId) => {
    window.location.href = `/view_product/${productId}`;
  };

  return (
    <div className="cart-page">
      <Dashboard />
      <div className="cart-page-container">
        <BuyPortalSidebar activeSection="cart" />
        <div className="main-container">
          <ul className="cart-container">
            <li>
              
              <p className="cart-header">Your Cart</p>
              <ul className="cart-list">
                {cartItems.map(item => (
                  <li key={item.cart_id} className="cart-item">
                    <img
                      src="/img.png"
                      alt="Product"
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <p className="cart-item-title">{item.product_name}</p>
                      <p className="cart-item-description">{item.description}</p>
                      <p className="cart-item-price">Price: ${item.price}</p>
                      <p className="cart-item-status">
                        Status: {item.product_status === 'sold' ? 'Already Sold' : 'Available'}
                      </p>
                    </div>
                    <button
                      className="view-product-button"
                      onClick={() => handleViewProduct(item.product_id)}
                      disabled={item.product_status === 'sold'}
                    >
                      View Product
                    </button>
                    <button
                      className="remove-item-button"
                      onClick={() => handleDelete(item.cart_id)}
                    >
                      <img src={Icon} alt="icon" style={{ width: '16px', height: '16px' }} />
                    </button>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <div className="cart-summary">
                <p className="cart-summary-heading">Cart Summary</p>
                <ul className="cart-summary-total-list">
                  <li className="cart-summary-total-item">
                    <p className="cart-summary-total">Total Price</p>
                  </li>
                  <li>
                    <p className="cart-summary-total">${totalPrice}</p>
                  </li>
                </ul>
                {/* <button
                  className="cart-summary-button"
                  disabled={cartItems.length === 0}
                >
                  Checkout
                </button> */}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;