import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleBuyPortal = () => {
    navigate('/buypage');
  };

  const handleSellPortal = () => {
    navigate('/sellings');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Goods Selling Platform</h1>
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={handleBuyPortal} 
          style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }}
        >
          Buy Portal
        </button>
        <button 
          onClick={handleSellPortal} 
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Sell Portal
        </button>
      </div>
    </div>
  );
};

export default Home;