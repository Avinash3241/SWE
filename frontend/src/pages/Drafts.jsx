import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./dashboard"; // Import the Dashboard component
import SellPortalSidebar from "../components/SellPortalSidebar"; // Import the Sidebar component
import "../styles/Drafts.css";

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const sellerId = sessionStorage.getItem("UserId"); // Get seller ID from sessionStorage
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch drafts from the backend
    axios
      .get(`${process.env.REACT_APP_API_URL}/drafts`, { params: { sellerId } })
      .then((response) => {
        setDrafts(response.data);
      })
      .catch((err) => {
        console.error("Error fetching drafts:", err);
        alert("Failed to fetch drafts.");
      });
  }, [sellerId]);

  const handleEditDraft = (draft) => {
    // Redirect to AddProduct page with draft details
    navigate("/sellings/addProduct", { state: { draft } });
  };

  const handleRemoveDraft = (productId) => {
    // Confirm deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this draft?"
    );
    if (!confirmDelete) return;

    // Remove the draft from the database
    axios
      .delete(`${process.env.REACT_APP_API_URL}/drafts/${productId}`)
      .then(() => {
        alert("Draft removed successfully.");
        setDrafts(drafts.filter((draft) => draft.product_id !== productId)); // Update the UI
      })
      .catch((err) => {
        console.error("Error removing draft:", err);
        alert("Failed to remove draft.");
      });
  };

  return (
    <div className="sell-page">
      <Dashboard /> {/* Add the top bar */}
      <div className="buy-page-container">
        <SellPortalSidebar activeSection="drafts" /> {/* Add the Sidebar */}
        <div className="drafts-container">
          <header className="drafts-header">
            <h1>Your Drafts</h1>
          </header>
          {drafts.length > 0 ? (
            <div className="drafts-list">
              {drafts.map((draft) => (
                <div key={draft.product_id} className="draft-card">
                  <div className="draft-image">
                    {/* <img
                      src={`${process.env.REACT_APP_API_URL}/uploads/${draft.product_id}.png`} // Fetch image from uploads folder
                      alt={draft.name}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150"; // Fallback image
                      }}
                    /> */}
                    <img
                      src={`${process.env.REACT_APP_API_URL}${draft.media_url}`} // Use the media_url from the backend
                      alt={draft.name}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150"; // Fallback image
                      }}
                    />
                  </div>
                  <h2 className="draft-name">{draft.name}</h2>
                  <p className="draft-price">${draft.price}</p>
                  <div className="draft-buttons">
                    <button
                      className="edit-button"
                      onClick={() => handleEditDraft(draft)}
                    >
                      Edit Draft
                    </button>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveDraft(draft.product_id)}
                    >
                      Remove from Draft
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No drafts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drafts;