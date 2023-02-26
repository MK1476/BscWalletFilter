import React from "react";
import BscWalletFilter from "./components/BscWalletFilter";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckBalance from './components/checkBalance';

function App() {
  

  return (
    
    

        <div>
       
       <NavigationBar />
       
       <BscWalletFilter/>
       
       
     </div>
    
   
    
  );
}

export default App;
