import React, { useState } from 'react';
import '../styles/Auth.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact_info, setContactInfo] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);

    // write this function to verify the email
    // const verifyemail = (email) => {

    // }

    if (password.length < 8 || !hasLetter || !hasNumber || !hasSymbol) {
      window.alert("Password must be at least 8 characters long and include letters, numbers, and symbols.");
    }
    else{

      const iscollege = /[a-zA-Z0-9]@iith.ac.in/.test(email);

      if(!iscollege){
        alert('This is not the college mail id');
        return;
      }

      axios.post(`${process.env.REACT_APP_API_URL}/getUserbyEmail`, { email})
        .then(res => {
          console.log("res",res);
          if(res.data.isUser === 0){
            axios.post(`${process.env.REACT_APP_API_URL}/signup`, { name, email, password, contact_info })
            .then(res => window.location.href="/")
            .catch(err => alert(err.response?.data?.error || 'Signup failed'));
          }
          else{
            alert("Email already existed");
          }
        })
        .catch(err => alert(err.response?.data?.error || 'User already existed'));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input 
              type="tel" 
              placeholder="10 digit Contact Number" 
              onChange={(e) => setContactInfo(e.target.value)}
              pattern="[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]"
              title="Please enter a valid 10-digit phone number" 
              required 
            />
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default SignUp;
