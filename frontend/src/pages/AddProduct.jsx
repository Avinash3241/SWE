import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./dashboard";
import SellPortalSidebar from "../components/SellPortalSidebar";
import "../styles/AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [productImage, setProductImage] = useState(null); // State for the uploaded image
  const seller_id = sessionStorage.getItem("UserId");
  const navigate = useNavigate();

  const handleSubmit = (e, status) => {
    e.preventDefault();

    // Validate the price field
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      alert("Invalid price. Please enter a valid numeric value greater than 0.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("seller_id", seller_id);
    formData.append("status", status);
    if (productImage) {
      formData.append("product_image", productImage); // Append the uploaded image
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/addProduct`, formData)
      .then(() => {
        alert(status === "draft" ? "Product saved as draft" : "Product listed successfully");
        navigate("/sellings");
      })
      .catch((err) => {
        alert("Error saving product: " + (err.response?.data?.error || err.message));
      });
  };

  return (
    <div className="sell-page">
      <Dashboard />
      <div className="buy-page-container">
        <SellPortalSidebar activeSection="addProduct" />
        <div className="add-product-container">
          <form className="add-product-form" onSubmit={(e) => handleSubmit(e, "available")}>
            <h2>Add Product for Sale</h2>

            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <select
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
              required
            >
              <option value="">Select Category</option>
              <option value={1}>Electronics</option>
              <option value={2}>Utensils</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])} // Handle image upload
            />

            <button type="submit">List Product</button>
            <button type="button" onClick={(e) => handleSubmit(e, "draft")}>
              Save as Draft
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;