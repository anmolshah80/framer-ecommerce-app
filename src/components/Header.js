import React from "react";
// import logo from "../logo.svg";
import logo_small from "../logo_small.svg";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="navigation__main">
        <a href="/" className="navigation__logo">
          <img className="header__logo" src={logo_small} alt="logo" />

          <span className="header__logoWordMark">Framer</span>
        </a>
      </div>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        {/* searchIcon */}
      </div>

      <div className="header__options">{/* cartIcon */}</div>

      <div className="header__options">
        <span className="header__userProfile">Profile</span>
      </div>

      <div className="header__options">
        <span className="header__userLogout">Logout</span>
      </div>
    </div>
  );
}

export default Header;
