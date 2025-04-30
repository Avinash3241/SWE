import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import '../styles/dashboard.css'

function Home() {
  return <h2>Home Page</h2>;
}

function Cart() {
  return <h2>Cart Page</h2>;
}

function Buyer() {
  return <h2>Buyer Page</h2>;
}

function Seller() {
  return <h2>Seller Page</h2>;
}

export default function Dashboard() {
  return (
    
      <div className="dashboard">
        <nav className="topbar">
          <div className="nav-left">
            <ul className="nav-links">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/buyings">My Requests</Link></li>
              <li><Link to="/sellings">My Sellings</Link></li>
              <li><Link to="/buyings_history">My Requests History</Link></li>
              <li><Link to="/sellings_history">My Sellings History</Link></li>
            </ul>
          </div>
          <div className="nav-right">
            <Link to="/profile" className="profile-link">Profile</Link>
            <Link to="/logout" className="logout-link">Logout</Link>
          </div>
        </nav>
      </div>
    
  );
}
