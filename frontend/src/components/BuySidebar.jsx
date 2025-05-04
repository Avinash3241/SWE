import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BuyPage.css"; // Reuse styles for the vertical menu

const BuySidebar = ({ activeSection }) => {
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    switch (section) {
      case "products":
        navigate("/buypage");
        break;
      case "cart":
        navigate("/buypage/cart");
        break;
      case "buyings_history":
        navigate("/buypage/buyings_history");
        break;
      case "sent_requests":
        navigate("/buypage/sent_requests");
        break;
      default:
        break;
    }
  };

  return (
    <div className="vertical-menu">
      <button
        className={activeSection === "products" ? "active" : ""}
        onClick={() => handleNavigation("products")}
      >
        Products
      </button>
      <button
        className={activeSection === "cart" ? "active" : ""}
        onClick={() => handleNavigation("cart")}
      >
        Cart
      </button>
      <button
        className={activeSection === "buyings_history" ? "active" : ""}
        onClick={() => handleNavigation("buyings_history")}
      >
        Bought History
      </button>
      <button
        className={activeSection === "sent_requests" ? "active" : ""}
        onClick={() => handleNavigation("sent_requests")}
      >
        Sent Requests
      </button>
    </div>
  );
};

export default BuySidebar;