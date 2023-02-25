import React, { useState } from 'react';
import fetchAddresses from './fetchAddresses';
import './styles.css';




function BscWalletFilter() {
  const [web3Url, setWeb3Url] = useState('https://bsc-dataseed.binance.org/');
  const [bscscanApiKey, setBscscanApiKey] = useState('8KRK7GQEFXZN7DD74TQ69QSJMPWTJSK2RQ');
  const [minBalance, setMinBalance] = useState(2);
  const [numAddresses, setNumAddresses] = useState(10);
  const [recentMonths, setRecentMonths] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addressList, setAddressList] = useState([]);
  
  

const handleFetchAddresses =  async () => {
  setLoading(true);
    

    fetchAddresses(web3Url, bscscanApiKey, minBalance, numAddresses, recentMonths,1,numAddresses)
      .then((result) => {setAddressList(result); setLoading(false);})
      .catch((error) => console.log(error));
  };


  


  return (
    <div className="container">
      <form className="form">
      <label className="form-label">
          Web3 URL:
          <input className="form-input" type="text" value={web3Url} onChange={(e) => setWeb3Url(e.target.value)} />
        </label>
        <br />
        <label className="form-label">
          Bscscan API Key:
          <input className="form-input" type="text" value={bscscanApiKey} onChange={(e) => setBscscanApiKey(e.target.value)} />
        </label>
        <br />
        <label className="form-label">
          Minimum balance in BNB:
          <input className="form-input" type="number" value={minBalance} onChange={(e) => setMinBalance(e.target.value)} />
        </label>
        <br />
        <label className="form-label">
          Number of addresses to download:
          <input className="form-input" type="number" value={numAddresses} onChange={(e) => setNumAddresses(e.target.value)} />
        </label>
        <br />
        <label className="form-label">
          How recent in months:
          <input className="form-input" type="number" value={recentMonths} onChange={(e) => setRecentMonths(e.target.value)} />
        </label>
        <br />
        
        <button
          className={`button ${loading ? "loading" : ""}`}
          type="button"
          onClick={handleFetchAddresses}
          disabled={loading}
        >
           {loading ? "Loading..." : "Fetch Addresses"}
        </button>

      </form>
      <div className='right-side'>
      {loading ? (
        <div className="loader"></div>
      ) : (
      <div >
      {addressList.length > 0 ? (
        <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {addressList.map((address) => (
              <tr key={address}>
                <td>{address}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <button onClick={handlePreviousPage}>Previous</button>
      <a> -- </a><a>{currentPage}</a><a> -- </a>
      <button onClick={handleNextPage}>Next</button>
      {getAddressListForPage().map((address, index) => (
        <div key={index}>{address}</div>
      ))} */}
        </div>
        
      ) : (
        <p>No addresses to display</p>
      )}
      </div>)}
      </div>
      
    </div>

    
  );
}

export default BscWalletFilter;
