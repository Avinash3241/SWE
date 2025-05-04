import React, { useState, useEffect } from "react";
import Dashboard from "./dashboard"; // Top bar component
import BuySidebar from "../components/BuySidebar"; // Sidebar component
import "../styles/sent_requests.css"; // Styles for Sent Requests
import axios from "axios";

const SentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const buyerId = sessionStorage.getItem("UserId"); // Get buyer ID from sessionStorage

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/sent_requests`,
          {
            params: { buyerId },
          }
        );
        console.log("Fetched Sent Requests:", response.data.requests);
        setRequests(response.data.requests);
      } catch (err) {
        console.error("Error fetching sent requests:", err);
        setError(
          err.response?.data?.message || "Failed to fetch sent requests."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [buyerId]);

  if (loading) return <p>Loading sent requests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="buy-page">
      <Dashboard /> {/* Top bar */}
      <div className="buy-page-container">
        <BuySidebar activeSection="sent_requests" /> {/* Sidebar */}
        <div className="content-area">
          <h1>Sent Requests</h1>
          {requests.length > 0 ? (
            <div className="requests-list">
              {requests.map((request) => (
                <div key={request.request_id} className="request-card">
                  <h2>{request.product_name}</h2>
                  <p>
                    <strong>Price:</strong> ${request.product_price}
                  </p>
                  <p>
                    <strong>Description:</strong> {request.product_description}
                  </p>
                  <p>
                    <strong>Status:</strong> {request.status}
                  </p>
                  <p>
                    <strong>Category:</strong> {request.category_name || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No sent requests available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SentRequests;
