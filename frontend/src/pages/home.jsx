import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

function Home(){
  const products = [
    { id: 1, name: 'Product Name', price: '₹ Price' },
    { id: 2, name: 'Product Name', price: '₹ Price' },
  ];

  return (
    <div>
        <div className="home-container">
        <header className="home-header">
            <h1>Product Listings</h1>
        </header>

        <div className="search-bar">
            <input type="text" placeholder="Search for products" />
            <button>Search</button>
        </div>

        <div className="product-list">
            {products.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
        </div>
    </div>
  );
};

export default Home;
