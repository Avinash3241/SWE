import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';
import Preload from '../hooks/preload';
import Dashboard from './dashboard';
import ProductFilter from './handleFilter'

function Home() {
  // Load all products initially

  // const [products, setProducts] = useState([]);

  // axios.post(`${process.env.REACT_APP_API_URL}/getProduct`, { productId:"none", isAll:1 })
  //           .then(res => setProducts(res.data.products))
  //           .catch(err => alert(err.response?.data?.error || 'Product fetch failed'));

  const products = Preload().products;
  console.log(products);
  const [searchKey, setSearchKey] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState(products);

  useEffect(() => {
    if (products.length > 0) {
      setDisplayedProducts(products);
    }
  }, [products]);

  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
  });

  const handleInput = (e) => {
    setSearchKey(e.target.value);
  };

  function unionArrays(arr1, arr2) {
    return Array.from(new Set([...arr1, ...arr2]));
  }

  const handleButton = () => {
    const filteredbyname = products.filter((product) =>
      product.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    const filteredbycategory = products.filter((product) =>
      product.c_name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setDisplayedProducts(unionArrays(filteredbyname,filteredbycategory));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // optional: handle filter logic here
  };

  return (
    <div>
      <div className="home-container">
        <Dashboard />
        {/* <ProductFilter onFilterChange={handleFilterChange}/> */}
        <div className="search-bar1">
          <input
            type="text"
            placeholder="Search for products"
            onChange={handleInput}
            value={searchKey}
          />
          <button onClick={handleButton}>Search</button>
        </div>

        <div className="product-list">
          {displayedProducts.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
