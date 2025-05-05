import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./dashboard"; // Top bar component
import ProductCard from "../components/ProductCard"; // Component to display products
import Preload from "../hooks/preload"; // Hook to fetch products
import BuySidebar from "../components/BuySidebar"; // Import the BuySidebar component
import "../styles/BuyPage.css"; // Styles for the Buy Page
import ProductFilter from './handleFilter'

const BuyPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("products"); // Default section
  const products = Preload().products; // Fetch products using the preload hook
  const [searchKey, setSearchKey] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState(products);

  useEffect(() => {
    if (products.length > 0) {
      setDisplayedProducts(products);
    }
  }, [products]);

  const handleInput = (e) => {
    setSearchKey(e.target.value);
  };

  const handleFilterChange = ({ priceRange, categories }) => {
    const [minPrice, maxPrice] = priceRange;
  
    const filtered = products.filter((product) => {
      const price = parseFloat(product.price);
      return price >= minPrice && price <= maxPrice;
    });

    // If you want to filter by categories as well, you can add that logic here
    // For example:
    console.log("Filtered products:", filtered);
    const filteredByCategory = filtered.filter((product) =>
      categories.includes(product.category)
    );
     console.log("Filtered by category:", filteredByCategory);
    // setDisplayedProducts(filteredByCategory);
    
  
    setDisplayedProducts(filtered);
  };

  const handleSearch = () => {
    const filteredByName = products.filter((product) =>
      product.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    const filteredByCategory = products.filter((product) =>
      product.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setDisplayedProducts([...new Set([...filteredByName, ...filteredByCategory])]);
  };

  // Render content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "products":
        return (
          <div>
            <div className="search-bar1">
              <input
                type="text"
                placeholder="Search for products"
                onChange={handleInput}
                value={searchKey}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
            <div className="product-list">
              {displayedProducts.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="buy-page">
      <Dashboard /> {/* Top bar */}
      <ProductFilter onFilterChange={handleFilterChange}/>
      <div className="buy-page-container">
        <BuySidebar
          activeSection={activeSection}
          onNavigate={(section) => {
            setActiveSection(section);
            if (section === "cart") {
              navigate("/buypage/cart");
            } else if (section === "buyings_history") {
              navigate("/buypage/buyings_history");
            }
          }}
        />
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
};

export default BuyPage;