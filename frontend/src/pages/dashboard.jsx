import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [isBuying, setIsBuying] = useState(true); // State to toggle between Buy and Sell portals
  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    // Update the active portal based on the current route
    if (location.pathname.startsWith("/buypage")) {
      setIsBuying(true);
    } else if (location.pathname.startsWith("/sellings")) {
      setIsBuying(false);
    }
  }, [location.pathname]);

  const handleSwitch = (portal) => {
    if (portal === "buy") {
      navigate("/buypage");
    } else {
      navigate("/sellings");
    }
  };

  return (
    <div className="dashboard">
      <nav className="topbar">
        {/* Left: Home */}
        <div className="nav-left">
          <Link to="/buypage" className="home-link">Home</Link> {/* Updated to navigate to /buypage */}
        </div>

        {/* Middle: Switch between Buy and Sell */}
        <div className="nav-middle">
          <button
            className={`switch-button ${isBuying ? "active" : ""}`}
            onClick={() => handleSwitch("buy")}
          >
            Buy
          </button>
          <button
            className={`switch-button ${!isBuying ? "active" : ""}`}
            onClick={() => handleSwitch("sell")}
          >
            Sell
          </button>
        </div>

        {/* Right: Notifications and Profile */}
        <div className="nav-right">
          <Link to="/interested_categories" className="notification-button">Interested Categories</Link>
          <Link to="/profile" className="profile-link">Profile</Link>
        </div>
      </nav>
    </div>
  );
}