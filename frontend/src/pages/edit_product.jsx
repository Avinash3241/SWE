import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/editProduct.css'; 

const EditProduct = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log("ProductId:", product_id);

  useEffect(() => {
      axios.post(`${process.env.REACT_APP_API_URL}/getProduct`, { productId:product_id, isAll:0 })
            .then(res => setProduct(res.data.products[0]))
            .catch(err => alert(err.response?.data?.error || 'Product fetch failed'));
  }, [product_id]);

  useEffect(() => {
    if (product && product.seller_id != localStorage.getItem('UserId')) {
        window.location.href = '/sellings';
        setError(true);
    }
  }, [product]);

    function handleSubmission(e) {
        e.preventDefault();
        console.log("ProductId:", product_id);
        console.log("Product:", product);
        axios.post(`${process.env.REACT_APP_API_URL}/updateProduct`, { product:product })
            .then(res => {
                alert("Product updated successfully");
                window.location.href = '/sellings';
            })
            .catch(err => alert(err.response?.data?.error || 'Product updation failed'));
    }

  if (!product) {
    return <div>Product Not Found...</div>;
  }
  else{
    // if(!seller){
    //     // alert("lo");
    //     return <div>Loading seller...</div>
    // }
  }

return (
    <div className="view-product-container1">
        <div className="product-card1">
            <label>
                Product Image:
                <input type="file" accept="image/*" className="product-image-upload1" />
            </label>
            <label>
                Product Name:
                <input
                    type="text"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    className="product-name-input1"
                />
            </label>
            <label>
                Description:
                <textarea
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    className="product-description-input1"
                ></textarea>
            </label>
            <label>
                Price:
                <input
                    type="number"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    className="product-price-input1"
                />
            </label>
            <label>
                Product Video:
                <input type="file" accept="video/*" className="product-video-upload1" />
            </label>
            <button className="save-button1" onClick={handleSubmission}>Save Changes</button>
        </div>
    </div>
);
};

export default EditProduct;
