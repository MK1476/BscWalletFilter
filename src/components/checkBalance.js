import React, { useState } from 'react';
import axios from 'axios';

const CheckBalance = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://api.bscscan.com/api?module=account&action=balance&address=${address}&tag=latest&apikey=YourApiKeyToken`);
      setBalance(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <div className="container">
      
      <form2 onSubmit={handleSubmit}>
      <h1>Check Balance</h1>
      {balance && (
        <div className="balance">
         
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {balance / 10 ** 18} BNB
          </p>
        </div>
      )}
        <input
          type="text"
          value={address}
          onChange={handleChange}
          placeholder="Enter Address"
        />
        
        <button type="submit">Check Balance</button>
      </form2>
      
    </div>
  );
};

export default CheckBalance;
