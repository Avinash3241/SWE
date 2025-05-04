import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./dashboard"; // Top bar component
import SellPortalSidebar from "../components/SellPortalSidebar"; // Sidebar component
import "../styles/purchase_requests.css"; // Styles for Purchase Requests

const PurchaseRequests = () => {
  const [requests, setRequests] = useState([]);
  const sellerId = sessionStorage.getItem("UserId"); // Get seller ID from sessionStorage

  useEffect(() => {
    // Fetch purchase requests from the backend
    axios
      .get(`${process.env.REACT_APP_API_URL}/purchase_requests`, {
        params: { sellerId },
      })
      .then((response) => {
        setRequests(response.data);
      })
      .catch((err) => {
        console.error("Error fetching purchase requests:", err);
        alert("Failed to fetch purchase requests.");
      });
  }, [sellerId]);

  const handleUpdateStatus = (requestId, status) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/purchase_requests/${requestId}`, {
        status,
      })
      .then((response) => {
        alert(`Request ${status} successfully.`);
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.request_id === requestId ? { ...req, status } : req
          )
        );
      })
      .catch((err) => {
        console.error("Error updating request status:", err);
        alert("Failed to update request status.");
      });
  };

  return (
    <div className="sell-page">
      <Dashboard /> {/* Top bar */}
      <div className="buy-page-container">
        <SellPortalSidebar activeSection="purchase_requests" /> {/* Sidebar */}
        <div className="content-area">
          <h1>Purchase Requests</h1>
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
                    <strong>Buyer Name:</strong> {request.buyer_name}
                  </p>
                  <p>
                    <strong>Buyer Email:</strong> {request.buyer_email}
                  </p>
                  {/* <p><strong>Buyer Contact:</strong> {request.buyer_contact}</p>
                  <p><strong>Buyer Address:</strong> {request.buyer_address}</p> */}
                  <p>
                    <strong>Status:</strong> {request.status}
                  </p>
                  <div className="request-buttons">
                    {request.status === "pending" && (
                      <>
                        <button
                          className="accept-button"
                          onClick={() =>
                            handleUpdateStatus(request.request_id, "accepted")
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="decline-button"
                          onClick={() =>
                            handleUpdateStatus(request.request_id, "declined")
                          }
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No purchase requests available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseRequests;
