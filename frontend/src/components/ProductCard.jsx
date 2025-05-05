import React from "react";
import "./ProductCard.css";

const viewProduct = (product_id) => {
  window.location = `/view_product/${product_id}`;
  console.log()
};

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={`/uploads/${product.product_id}.png`} // Display the product image
          alt="Product"
          className="product-image"
        />
      </div>
      
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">${product.price}</p>
      <button className="view-button" onClick={() => viewProduct(product.product_id)}>
        View Product
      </button>
    </div>
  );
};

export default ProductCard;