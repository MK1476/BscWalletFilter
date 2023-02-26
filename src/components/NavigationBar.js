import React from "react";
import "./Navbar.css";
import { FaGithub } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <a href="/" className="navbar__logo">Bsc Wallet Address Filter</a>
        <ul className="navbar__menu">
          
          <li className="navbar__item">
          <a href="https://github.com/MK1476/BscWalletFilter" className="navbar__link" target="_blank" rel="noopener noreferrer">Github <FaGithub /></a>
          </li>
          
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
