import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Dashboard from './dashboard';
import { Link } from 'react-router-dom';
import Preload_sellings from '../hooks/preload_sellings';
import '../styles/seller_listings.css'
import EditProductCard from '../components/editProductCard'

function Sellings() {
    // const user_id = localStorage.getItem('userId');
    const products = Preload_sellings().products;
    return (
        <div>
      <div className="home-container">
        <Dashboard />
        {/* <ProductFilter onFilterChange={handleFilterChange}/> */}

        <div className="product-list">
          {products.map((product) => (
            <EditProductCard key={product.product_id} product={product} />
          ))}
          {/* <button>Edit this product</button>
          <button>Delete this product</button> */}
        </div>
      </div>
    </div>

    );
};

export default Sellings;