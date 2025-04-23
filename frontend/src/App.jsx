import React from 'react';
import './styles/Auth.css';
import { createBrowserRouter, RouterProvider , BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from "./routes";

const router = createBrowserRouter(routes); 

function App() {
  return (
    <div className="auth-container">
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
    </div>
  )
}

export default App;
