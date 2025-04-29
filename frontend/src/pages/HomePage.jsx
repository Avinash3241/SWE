import React, { useState } from "react";
import ProductCard from '../components/ProductCard';
import "../styles/HomePage.css"; // Import the CSS file
import Preload from '../hooks/preload';

export default function HomePage({  }) {
  const [searchQuery, setSearchQuery] = useState("");

  // const filteredProducts = products.filter(product =>
  //   product.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const products = Preload().products;

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </header>

      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}
