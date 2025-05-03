import React, { useState, useEffect } from 'react';
import Dashboard from './dashboard';
import { Link } from 'react-router-dom';
import Preload_Buyings from '../hooks/Preload_Buyings';
import '../styles/seller_listings.css'
// import EditProductCard from '../components/editProductCard'
import ProductCard from '../components/ProductCard';
import Preload_Buyings_history from '../hooks/Preload_Buyings_history';

function Buyings_history() {
    const user_id = localStorage.getItem('userId');
    const products = Preload_Buyings_history().products;
    return (
        <div>
      <div className="home-container">
        <Dashboard />
        {/* <ProductFilter onFilterChange={handleFilterChange}/> */}

        <div className="product-list">
          {products.map((product) => (
            <div>
                <ProductCard key={product.product_id} product={product} />
                <div>
                    {product.p_r_status === "accepted" ? <h3 className='product-card-accepted'>Accepted  at {new Date(product.p_r_up_time).toISOString().split('T')[0]}</h3> : <h3 className='product-card-declined'>Declined at {new Date(product.p_r_up_time).toISOString().split('T')[0]}</h3>}
                </div>
            </div>
          ))}
          {/* <button>Edit this product</button>
          <button>Delete this product</button> */}
        </div>
      </div>
    </div>

    );
};

export default Buyings_history;