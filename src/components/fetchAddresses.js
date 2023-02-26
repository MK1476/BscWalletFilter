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
   if ( balance/10**18>balanceWei/10**18) {
    console.log("balance :"+ balance);
console.log('mb : '+balanceWei);
console.log(balance+"is less than"+balanceWei+"check :"+ balance<balanceWei);
          validAddresses.push(addresses[j]);
          i++;
  }else{

  }
  
})
.catch(error => console.error(error));

      
    };

    return Array.from(validAddresses);
  } catch (error) {
    console.error(error);
    return null;
    
  }
}
module.exports = fetchAddresses;