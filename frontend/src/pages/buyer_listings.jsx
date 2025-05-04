import React, { useState, useEffect } from "react";
import Dashboard from "./dashboard";
import { Link } from "react-router-dom";
import Preload_Buyings from "../hooks/Preload_Buyings";
import "../styles/seller_listings.css";
import EditProductCard from "../components/editProductCard";

function Buyings() {
  const user_id = sessionStorage.getItem("userId");
  const products = Preload_Buyings().products;
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
}

export default Buyings;
