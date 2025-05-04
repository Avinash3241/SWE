import React from "react";
import "./ProductCard.css";
import axios from "axios";

const viewProduct = (product_id) => {
  // console.log(e);
  window.location = `/view_product/${product_id}`;
};

const viewRequest = (product_id) => {
  // console.log(e);
  window.location = `/view_requests/${product_id}`;
};

const editProduct = (product_id) => {
  // console.log(e);
  window.location = `/edit_product/${product_id}`;
};

const handleDelete = (e, Product_name) => {
  console.log(e.target.value, Product_name);
  var product_id = e.target.value;
  var txt = window.confirm("Do you want to delete this product????");
  console.log(sessionStorage.getItem("UserId"));
  if (txt === true) {
    // deleting the product;
    // axios.post(`${process.env.REACT_APP_API_URL}/deleteProduct`, { productId:product_id, user_id:sessionStorage.getItem('UserId') })
    //     .then(res => console.log(res.data))
    //     .catch(err => alert(err.response?.data?.error || 'Product deletion failed'));

    console.log("Product_name:", e);
    // Informing the buyer and delete it.
    axios
      .post(`${process.env.REACT_APP_API_URL}/informBuyer`, {
        productId: product_id,
        Product_name: Product_name,
        user_id: sessionStorage.getItem("UserId"),
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) =>
        alert(err.response?.data?.error || "Informing buyer failed")
      );

    window.location.reload();
  }
};

const EditProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src="/styles/1.jpeg" alt="Product" className="product-image"></img>
      </div>
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">{product.price}</p>
      <button
        className="view-button"
        onClick={(e) => editProduct(product.product_id)}
      >
        Edit the Product
      </button>
      <button
        className="view-button"
        onClick={(e) => handleDelete(e, product.name)}
        value={[product.product_id]}
      >
        Delete this Product
      </button>
      <button
        className="view-button"
        onClick={(e) => viewRequest(product.product_id)}
      >
        View Requests
      </button>
    </div>
  );
};

export default EditProductCard;
