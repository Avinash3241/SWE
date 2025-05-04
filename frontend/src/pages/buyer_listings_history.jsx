import React from 'react';
import Dashboard from './dashboard';
import BuySidebar from '../components/BuySidebar'; // Import the Sidebar component
import '../styles/seller_listings.css';
import ProductCard from '../components/ProductCard';
import Preload_Buyings_history from '../hooks/Preload_Buyings_history';

function Buyings_history() {
    const products = Preload_Buyings_history().products;

    return (
        <div className="sell-page">
            <Dashboard /> {/* Top bar */}
            <div className="buy-page-container">
                <BuySidebar activeSection="buyings_history" /> {/* Add the Sidebar */}
                <div className="content-area">
                    {products.length === 0 ? (
                        <p className="empty-message">No products found in your bought history.</p>
                    ) : (
                        <div className="product-list">
                            {products.map((product) => (
                                <div>
                                <ProductCard key={product.product_id} product={product} />
                                <div>
                                    {product.p_r_status === "accepted" ? <h3 className='product-card-accepted'>Accepted  at {new Date(product.p_r_up_time).toISOString().split('T')[0]}</h3> : <h3 className='product-card-declined'>Declined at {new Date(product.p_r_up_time).toISOString().split('T')[0]}</h3>}
                                </div>
                            </div>
                                
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Buyings_history;