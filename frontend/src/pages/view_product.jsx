import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/ViewProduct.css'; 

const ViewProduct = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);

  console.log("ProductId:", product_id);

  useEffect(() => {
      axios.post(`${process.env.REACT_APP_API_URL}/getProduct`, { productId:product_id, isAll:0 })
            .then(res => setProduct(res.data.products[0]))
            .catch(err => alert(err.response?.data?.error || 'Product fetch failed'));
  }, [product_id]);

  useEffect(() => {
    if (product && product.seller_id) {
      axios.post(`${process.env.REACT_APP_API_URL}/getUser`, { userId: product.seller_id })
        .then(res => setSeller(res.data.user))
        .catch(err => alert(err.response?.data?.error || 'No seller found'));
    }
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }
  else{
    if(!seller){
        // alert("lo");
        return <div>Loading seller...</div>
    }
  }

  return (
    <div className="view-product-container1">
      <div className="product-card1">
        <img src={product.image} alt={product.product_name} className="product-image1" />
        <h1 className="product-name1">{product.product_name}</h1>
        <p className="product-description1">{product.description}</p>
        <p className="product-price1">${product.price}</p>
        <button className="buy-button1">Add to cart</button>
        <div className="seller">
          {seller ? (
            <>
              <h3>Seller Information</h3>
              <p><strong>Name:</strong> {seller.name}</p>
              <p><strong>Email:</strong> {seller.email}</p>
              {/* <p><strong>Contact:</strong> {seller.contact}</p> */}
            </>
          ) : (
            <p>Loading seller details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
