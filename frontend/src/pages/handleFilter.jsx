import React, { useState } from 'react';
// import axios from 'axios';
// import '../styles/filter.css'

const ProductFilter = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
//   const [selectedCategory, setSelectedCategory] = useState('');

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    onFilterChange({
    //   category: selectedCategory,
      priceRange: [e.target.value, maxPrice]
    });
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    onFilterChange({
    //   category: selectedCategory,
      priceRange: [minPrice, e.target.value]
    });
  };

  return (
    <div className="filter-container">
      <h3>Filter Products</h3>
      {/* <div className="filter-item">
        <label htmlFor="category">Category</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div> */}

      <div className="filter-item">
        <label htmlFor="minPrice">Min Price</label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
      </div>

      <div className="filter-item">
        <label htmlFor="maxPrice">Max Price</label>
        <input
          type="number"
          id="maxPrice"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
};

export default ProductFilter;
