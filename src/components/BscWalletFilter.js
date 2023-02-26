import React, { useState } from 'react';

import './styles.css';
import MyCopyIcon  from "./copyicon.png";
import axios from 'axios';  
import { FaDownload } from 'react-icons/fa';


function BscWalletFilter() {
  const [web3Url, setWeb3Url] = useState('https://bsc-dataseed.binance.org/');
  const [bscscanApiKey, setBscscanApiKey] = useState('8KRK7GQEFXZN7DD74TQ69QSJMPWTJSK2RQ');
  const [minBalance, setMinBalance] = useState(2);
  const [numAddresses, setNumAddresses] = useState(10);
  const [recentMonths, setRecentMonths] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [copy,setCopy]=useState(false)
  const [addressb, setAddress] = useState('');
  const [balanceb, setBalance] = useState('');
  const [loading2, setLoading2] = useState(false);
  const Web3 = require('web3');

//const parse = require('csv-parse/lib/sync');



const fetchAddresses = async (web3Url, apiKey, minimumBalance, numAddresses, numMonths, pageNum, pageSize) => {
  try {
    
    const balanceWei = Web3.utils.toWei(minimumBalance.toString(), "ether");
    
    const web3 = new Web3(new Web3.providers.HttpProvider(web3Url));

  // Get latest block number
  const blockNumber = await web3.eth.getBlockNumber();

  // Calculate block number for specified number of months
  const monthsInBlocks = numMonths * 30 * 24 * 60 * 4;
  const endBlock = blockNumber - monthsInBlocks;
  const startIndex = (pageNum - 1) * pageSize;
    
  const url = `https://api.bscscan.com/api?module=account&action=txlist&address=0x0000000000000000000000000000000000001004&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=${apiKey}`;
  let transactions;
    console.log("b : " +blockNumber);
    console.log("e : "+endBlock );
    console.log("api : "+apiKey );
    
await fetch(url)
.then(response => response.json())
.then(data => {
  const result = data.result;
  transactions = result.map(obj => obj.from);
  console.log("add2 : "+transactions[1]);
})
.catch(error => console.error(error));


    var validAddresses= [];
    var addresses = new Set();

  const txList = Object.values(transactions);

  for (let i = 0; i < txList.length; i++) {
    const tx = txList[i];
      const from = tx.toLowerCase();
      
      if (!addresses.has(from) && web3.utils.isAddress(from)) {
        addresses.add(from);
      }
    }
    addresses = Array.from(addresses);
    let i,j;
    for( i=startIndex,j=startIndex;i<startIndex+pageSize;j++) {

        const balanceUrl = `https://api.bscscan.com/api?module=account&action=balance&address=${addresses[j]}&tag=latest&apikey=${apiKey}`;
      let balance;
      
     
      await fetch(balanceUrl)
.then(response => response.json())
.then(data => {
   balance = data.result;
   
  
}

)
.catch(error => console.error(error));

if ( balance/10**18>balanceWei/10**18) {
  console.log("balance :"+ balance);
console.log('mb : '+balanceWei);
console.log(balance+"is less than"+balanceWei+"check :"+ balance<balanceWei);
        validAddresses.push(addresses[j]);
        i++;
}else{

}      




    };


    
    return Array.from(validAddresses);
  } catch (error) {
    console.error(error);
    return null;
    
  }
}

  const handleSubmit = async (event) => {
    setBalance('');
    event.preventDefault();
    try {
      setLoading2(true)
      const response = await axios.get(`https://api.bscscan.com/api?module=account&action=balance&address=${addressb}&tag=latest&apikey=${bscscanApiKey}`);
      setBalance(response.data.result);
      setLoading2(false)
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  

const handleFetchAddresses =  async () => {
  setLoading(true);
    

    fetchAddresses(web3Url, bscscanApiKey, minBalance, numAddresses, recentMonths,1,numAddresses)
      .then((result) => {
         if(!result)alert('Something is wrong!');
         else{setAddressList(result);
          }
          setLoading(false);
      })
      .catch((error) => {console.log(error);alert(error);});
  };

  const handleDownloadClick = async () => {
    try {
      
      const response = await axios.get('https://api.bscscan.com/api', {
        params: {
          module: 'account',
          action: 'txlist',
          address: addressb,
          sort: 'desc',
          apikey: bscscanApiKey
        }
      });
      const data = response.data;
      const fileName = 'transactions.json';
      const json = JSON.stringify(data);
      const blob = new Blob([json], {type: 'application/json'});
      const href =  URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    } finally {
      
    }
  };
  const downloadCSV =()=> {
    
  
    // Convert the addresses to a CSV string
    const csv = "data:text/csv;charset=utf-8," + addressList.join("\n");
  
    // Download the CSV file
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", "addresses.csv");
    link.click();
  }
  
  
// Get all table rows
const rows = document.querySelectorAll('tbody tr');

// Add event listeners to each row
rows.forEach(row => {
  // Show copy icon when row is hovered over
  row.addEventListener('mouseenter', () => {
    row.querySelector('.copy-icon').style.display = 'table-cell';
    console.log('hovered');
  });
  // Hide copy icon when mouse leaves row
  row.addEventListener('mouseleave', () => {
    row.querySelector('.copy-icon').style.display = 'none';
    setCopy(false);
  });
  // Copy address when copy icon is clicked
  row.querySelector('.copy-icon').addEventListener('click', () => {
    const address = row.querySelector('td:nth-child(2)').textContent;
    navigator.clipboard.writeText(address);
    console.log(address);
    setCopy(true);
  });
});



  return (
    <div className='container-main'>
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
          How recent is the last transaction (in months):
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
              <th>S.No</th>
              <th>Filtered Addresses</th>
            </tr>
          </thead>
          <tbody>
            {addressList.map((address,index) => (
              <tr key={address}>
                <td>{index+1}</td>
                <td>{address}</td>
                <td className="copy-icon"><img src={MyCopyIcon} width="15px" height="15px" alt = '.'/> {copy? 'copied!':'copy'}</td>
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
      <div className="download-container">
  <button className="download-button" onClick={downloadCSV}>Download Addresses <FaDownload /></button>
</div>

        </div>
        
      ) : (
        <p>No addresses to display</p>
      )}
      </div>)}
      </div>
      
    </div>
    <div className='form2'>
      <div className='abar'>
        <input
          type="text"
          value={addressb}
          onChange={handleChange}
          placeholder="Enter Address"
        />
        
        <button className='button' type="button" onClick={handleSubmit}>Check Balance</button>
        <button className='button' type="button" onClick={handleDownloadClick}>Download Transactions</button>
        </div>
        <div className='cbview'>
      {!loading2 ? (balanceb && (
        <div className="balance">
         <h1>Balance : </h1>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {balanceb / 10 ** 18} BNB
          </p>
        </div>
      )):(<div>loading...</div>)}</div>
      </div>

</div>

    
  );
}

export default BscWalletFilter;
