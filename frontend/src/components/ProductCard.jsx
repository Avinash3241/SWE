import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">Product Image</div>
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">{product.price}</p>
      <button className="view-button">View Product</button>
    </div>
  );
};

export default ProductCard;
