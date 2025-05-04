import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, { email, password })
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem("authToken", res.data.token);
          sessionStorage.setItem("UserId", res.data.user.user_id);
          console.log(res.data);
          window.location.href = "/buypage";
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch((err) =>
        alert(err.response?.data?.error || "Invalid Credentials")
      );
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
