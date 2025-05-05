import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ViewProduct.css';

const ViewProduct = () => {
  const { product_id } = useParams(); // Get product_id from the URL
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false); // Track if the product is already in the cart
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details
    axios
      .post(`${process.env.REACT_APP_API_URL}/getProduct`, { productId: product_id, isAll: 0 })
      .then((res) => setProduct(res.data.products[0]))
      .catch((err) => alert(err.response?.data?.error || 'Failed to fetch product details.'));

    // Check if the product is already in the cart
    const buyerId = sessionStorage.getItem('UserId');
    axios
      .post(`${process.env.REACT_APP_API_URL}/getCartItems`, { userId: buyerId })
      .then((res) => {
        const cartItems = res.data.cartItems;
        const productInCart = cartItems.some((item) => item.product_id === parseInt(product_id));
        setIsInCart(productInCart);
      })
      .catch((err) => console.error('Failed to check cart items:', err));
  }, [product_id]);

  const handleAddToCart = () => {
    if (isInCart) {
      alert('Product is already in your cart.');
      return;
    }

    const buyerId = sessionStorage.getItem('UserId');
    axios
      .post(`${process.env.REACT_APP_API_URL}/addToCart`, { buyer_id: buyerId, product_id })
      .then(() => {
        alert('Product added to cart successfully.');
        navigate('/buypage/cart'); 
        setIsInCart(true); // Update the state to reflect the product is now in the cart
      })
      .catch((err) => alert(err.response?.data?.error || 'Failed to add product to cart.'));
  };

  const handleSendRequest = () => {
    const buyerId = sessionStorage.getItem('UserId');
    axios
      .post(`${process.env.REACT_APP_API_URL}/sendRequest`, { buyer_id: buyerId, product_id })
      .then(() => {
        alert('Purchase request sent successfully.');
        navigate('/buypage/sent_requests'); // Redirect to purchase requests page
      })
      .catch((err) => {
        alert(err.response?.data?.error || 'Failed to send purchase request.');
      });
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="view-product-page">
      <h1>{product.name}</h1>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      {/* <p><strong>Category:</strong> {product.category_name || 'N/A'}</p> */}
      <p><strong>Seller Name:</strong> {product.seller_name}</p>
      <p><strong>Seller Email:</strong> {product.seller_email}</p>
      <div className="product-actions">
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          {isInCart ? 'Already in Cart' : 'Add to Cart'}
        </button>
        <button className="send-request-button" onClick={handleSendRequest}>
          Send Request
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;