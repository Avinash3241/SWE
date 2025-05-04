import React from "react";
import Dashboard from "./dashboard"; // Top bar component
import EditProductCard from "../components/editProductCard"; // Component to display editable products
import Preload_sellings from "../hooks/preload_sellings"; // Hook to fetch seller listings
import SellPortalSidebar from "../components/SellPortalSidebar"; // Sidebar component
import "../styles/BuyPage.css"; // Reuse styles

const Sellings = () => {
  const products = Preload_sellings().products; // Fetch seller listings

  return (
    <div className="sell-page">
      <Dashboard /> {/* Top bar */}
      <div className="buy-page-container">
        <SellPortalSidebar activeSection="listings" /> {/* Sidebar */}
        <div className="content-area">
          <div className="product-list">
            {products.map((product) => (
              <EditProductCard key={product.product_id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellings;