import React, { useState } from 'react';
import '../styles/filter.css';
import Preload_Categories from '../hooks/Preload_categories';

const ProductFilter = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [isCollapsed, setIsCollapsed] = useState(true); // Sidebar collapsed by default
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    onFilterChange({
      priceRange: [e.target.value, maxPrice],
    });
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    onFilterChange({
      priceRange: [minPrice, e.target.value],
    });
  };

  const toggleFilter = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleFilter = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setSelectedCategories([]);
    onFilterChange({
      priceRange: [0, 1000],
      categories: [],
    });
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    onFilterChange({
      priceRange: [minPrice, maxPrice],
      categories: updatedCategories,
    });
  };

  const categories = Preload_Categories().categories;

  return (
    <>
      <div className={`filter-container ${isCollapsed ? 'collapsed' : ''}`}>
        <h3>Filter Products</h3>

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

        <div className="filter-item">
          <h4>Categories</h4>
          {categories.map((category) => (
            <div key={category.name} className="category-item">
              <input
                type="checkbox"
                id={category.name}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={category.name}>{category.name}</label>
            </div>
          ))}
        </div>

        <br />
        <button onClick={handleFilter}>Reset</button>
      </div>

      <button className="filter-toggle" onClick={toggleFilter}>
        {isCollapsed ? '☰ Filters' : '✕ Close'}
      </button>
    </>
  );
};

export default ProductFilter;
