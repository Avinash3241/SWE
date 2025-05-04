import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./dashboard"; // Import the Dashboard component
import SellPortalSidebar from "../components/SellPortalSidebar"; // Import the Sidebar component
import "../styles/AddProduct.css";

const AddProduct = () => {
  const location = useLocation();
  const draft = location.state?.draft || {}; // Get draft details from state

  const [productId, setProductId] = useState(draft.product_id || null); // Track product_id for updates
  const [name, setName] = useState(draft.name || "");
  const [description, setDescription] = useState(draft.description || "");
  const [price, setPrice] = useState(draft.price || "");
  const [category, setCategory] = useState(draft.category_id || "");
  const [mediaType, setMediaType] = useState("");
  const [mediaUrl, setMediaUrl] = useState(draft.media_url || "");
  const seller_id = sessionStorage.getItem("UserId"); // Get seller_id from sessionStorage

  const navigate = useNavigate();

  const handleSubmit = (e, status) => {
    e.preventDefault();

    const productData = {
      product_id: productId, // Include product_id for updates
      name,
      description,
      price,
      category,
      mediaType,
      mediaUrl,
      seller_id,
      status, // "available" or "draft"
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/addProduct`, productData)
      .then(() => {
        if (status === "draft") {
          alert("Product saved as draft");
          navigate("/sellings/drafts"); // Redirect to Draft Listings page
        } else {
          alert("Product listed successfully");
          navigate("/sellings"); // Redirect to Listings page
        }
      })
      .catch((err) => {
        alert("Error saving product: " + err.response?.data?.error || err.message);
      });
  };

  return (
    <div className="sell-page">
      <Dashboard /> {/* Add the top bar */}
      <div className="buy-page-container">
        <SellPortalSidebar activeSection="addProduct" /> {/* Add the Sidebar */}
        <div className="add-product-container">
          <form className="add-product-form" onSubmit={(e) => handleSubmit(e, "available")}>
            <h2>{productId ? "Edit Draft" : "Add Product for Sale"}</h2>

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

            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
            >
              <option value="">Select Media Type</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>

            <input
              type="url"
              placeholder="Media URL"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
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