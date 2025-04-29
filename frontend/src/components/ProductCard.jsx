import React from 'react';
import './ProductCard.css';

const viewProduct = (product_id) => {
  // console.log(e); 
  window.location = `/view_product/${product_id}`;
}

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image"><img src="/styles/1.jpeg" alt="Product" className='product-image'></img></div>
      <h2 className="product-name">{product.product_name}</h2>
      <p className="product-price">{product.price}</p>
      <button className="view-button" onClick={(e) => viewProduct(product.product_id)}>View Product</button>
    </div>
  );
};

export default ProductCard;
