import React, { useState, useEffect } from 'react';
import Preload from '../hooks/preload';

function Logout() {
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
        window.location.href = '/';
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
