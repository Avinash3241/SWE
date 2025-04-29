import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';
import Preload from '../hooks/preload';
import ProductFilter from './handleFilter';

function Home(){
  // const [products, setProducts] = useState([]);

  // axios.post(`${process.env.REACT_APP_API_URL}/getProduct`, { productId:"none", isAll:1 })
  //           .then(res => setProducts(res.data.products))
  //           .catch(err => alert(err.response?.data?.error || 'Product fetch failed'));

  const products = Preload().products;

  // setProducts(products)

  // useEffect(() => {
  //   const preloadData = Preload(); // Call your preload function
  //   if (preloadData?.products?.length > 0) {
  //     setProducts(preloadData.products);
  //   } else {
  //     // If no preload available, you could fetch from server or handle error
  //     console.warn("No preload products found.");
  //   }
  // }, []);

  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000]
  });
  

  function handleButton(e){
    axios.post(`${process.env.REACT_APP_API_URL}/filterproducts`, {minPrice: filters.priceRange[0], maxPrice: filters.priceRange[1] })
      .then(res => {console.log(res.data.products)})
      .catch(err => alert(err.response?.data?.error || 'Product fetch failed'));
    console.log(products);
  }

  function handleFilter(e){
    console.log(e);
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
        <div className="home-container">
        {/* <header className="home-header">
            <h1>Product Listings</h1>
        </header> */}
        {/* <ProductFilter onFilterChange={handleFilterChange} /> */}
        <div className="search-bar">
            <input type="text" placeholder="Search for products" onChange={(e) => handleFilter(e)}/>
            <button onClick={handleButton}>Search</button>
        </div>

        <div className="product-list">
            {products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
            ))}
        </div>
        </div>
    </div>
  );
};

export default Home;
