import React, { useState, useEffect } from "react";
import Preload from "../hooks/preload";

function Logout() {
  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userType");
    window.location.href = "/";
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      <h2>You have been logged out.</h2>
      <p>Redirecting to home page...</p>
    </div>
  );
}

export default Logout;
