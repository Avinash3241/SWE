import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BuyPage.css"; // Reuse styles for the vertical menu

const SellPortalSidebar = ({ activeSection }) => {
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    switch (section) {
      case "listings":
        navigate("/sellings");
        break;
      case "addProduct":
        navigate("/sellings/addProduct");
        break;
      case "drafts":
        navigate("/sellings/drafts");
        break;
      case "sellings_history": // Correct route for Sell History
        navigate("/sellings/sellings_history");
        break;
      case "purchase_requests":
        navigate("/sellings/purchase_requests");
        break;
      default:
        break;
    }
  };

  return (
    <div className="vertical-menu">
      <button
        className={activeSection === "listings" ? "active" : ""}
        onClick={() => handleNavigation("listings")}
      >
        Listings
      </button>
      <button
        className={activeSection === "addProduct" ? "active" : ""}
        onClick={() => handleNavigation("addProduct")}
      >
        Add Product
      </button>
      <button
        className={activeSection === "drafts" ? "active" : ""}
        onClick={() => handleNavigation("drafts")}
      >
        Drafts
      </button>
      <button
        className={activeSection === "sellings_history" ? "active" : ""}
        onClick={() => handleNavigation("sellings_history")}
      >
        Sell History
      </button>
      <button
        className={activeSection === "purchase_requests" ? "active" : ""}
        onClick={() => handleNavigation("purchase_requests")}
      >
        My Requests
      </button>
    </div>
  );
};

export default SellPortalSidebar;
