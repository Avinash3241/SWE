import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Cart.css";
import Icon from "../icons/xmark.svg";
import Dashboard from "./dashboard"; // Import the Dashboard component
import BuySidebar from "../components/BuySidebar"; // Import the BuySidebar component

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const buyerId = sessionStorage.getItem("UserId");
    axios
      .post(`${process.env.REACT_APP_API_URL}/getCartItems`, { buyerId })
      .then((res) => {
        setCartItems(res.data.cartItems);
        calculateTotalPrice(res.data.cartItems);
      })
      .catch((err) =>
        alert(err.response?.data?.error || "Failed to fetch cart items")
      );
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (sum, item) => sum + parseFloat(item.price || 0),
      0
    );
    setTotalPrice(total);
  };

  const handleDelete = (cartId) => {
    const buyerId = sessionStorage.getItem("UserId");
    axios
      .post(`${process.env.REACT_APP_API_URL}/deleteCartItems`, {
        buyerId,
        cartIds: [cartId],
      })
      .then(() => {
        const updatedCartItems = cartItems.filter(
          (item) => item.cart_id !== cartId
        );
        setCartItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems);
        alert("Item removed from cart successfully.");
      })
      .catch((err) =>
        alert(err.response?.data?.error || "Failed to remove item.")
      );
  };

  const handleSendRequests = () => {
    const userId = sessionStorage.getItem("UserId");
    axios
      .post(`${process.env.REACT_APP_API_URL}/sendRequests`, {
        userId,
        cartItems,
      })
      .then(() => {
        alert("Requests sent successfully for all items in the cart");
      })
      .catch((err) =>
        alert(err.response?.data?.error || "Failed to send requests")
      );
  };

  return (
    <div className="buy-page">
      <Dashboard /> {/* Add the top bar */}
      <div className="buy-page-container">
        <BuySidebar activeSection="cart" /> {/* Add the BuySidebar */}
        <div className="content-area">
          <div className="main-container">
            <div className="header"></div>

            <ul className="cart-container">
              <li>
                <p className="cart-header">Your Cart</p>
                <ul className="cart-list">
                  {cartItems.map((item) => (
                    <li key={item.cart_id} className="cart-item">
                      <img
                        src="/img.png"
                        alt="Product"
                        className="cart-item-image"
                      />
                      <div className="cart-item-details">
                        <p className="cart-item-title">{item.product_name}</p>
                        <p className="cart-item-description">
                          {item.description}
                        </p>
                        <p className="cart-item-price">Price: ${item.price}</p>
                      </div>
                      <button
                        className="remove-item-button"
                        onClick={() => handleDelete(item.cart_id)}
                      >
                        <img
                          src={Icon}
                          alt="icon"
                          style={{ width: "16px", height: "16px" }}
                        />
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
                      <p className="cart-summary-total">Total</p>
                    </li>
                    <li>
                      <p className="cart-summary-total">
                        {cartItems.length} Products
                      </p>
                    </li>
                  </ul>
                  <ul className="cart-summary-total-list">
                    <li className="cart-summary-total-item">
                      <p className="cart-summary-total">Total Price</p>
                    </li>
                    <li>
                      <p className="cart-summary-total">${totalPrice}</p>
                    </li>
                  </ul>
                  <button
                    className="cart-summary-button"
                    onClick={handleSendRequests}
                    disabled={cartItems.length === 0}
                  >
                    Send Requests
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
