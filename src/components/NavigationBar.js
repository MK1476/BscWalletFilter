import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <a href="/" className="navbar__logo">Bsc Wallet Address Filter</a>
        <ul className="navbar__menu">
          <li className="navbar__item">
            <a href="/" className="navbar__link">Home</a>
          </li>
          <li className="navbar__item">
            <a href="/about" className="navbar__link">About</a>
          </li>
          <li className="navbar__item">
            <a href="/contact" className="navbar__link">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
