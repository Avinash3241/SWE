import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Dashboard from './dashboard';
import SellPortalSidebar from '../components/SellPortalSidebar'; // Import the Sidebar component
import { Link } from 'react-router-dom';
import '../styles/seller_listings.css';
import Preload_sellings_history from '../hooks/Preload_sellings_history';

function Sellings_history() {
    const products = Preload_sellings_history().products;

    return (
        <div className="sell-page">
            <Dashboard /> {/* Top bar */}
            <div className="buy-page-container">
                <SellPortalSidebar activeSection="sellings_history" /> {/* Add the Sidebar */}
                <div className="content-area">
                    <div className="product-list">
                        {products.map((product) => (
                           <div>
                           <ProductCard key={product.product_id} product={product} />
                           <div>
                               {product.status === "removed" ? <h3 className='product-card-declined'>Product Removed</h3> : <h3 className='product-card-accepted'>Product Sold</h3>}
                           </div>
                       </div>
                            
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sellings_history;