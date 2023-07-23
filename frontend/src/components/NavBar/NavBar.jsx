import React from "react";
import './NavBar.css';
import yepLogo from '../../assets/images/yepLogo.png';

const NavBar = () => {
  return (
    <div id="nav-bar">

      <div id="nav-bar-content">
        <h1 id="app-title">yep!</h1>

        <img src={yepLogo} alt="Yep Logo" id="app-logo"/>

        <button id="category-btn">
          <span>Restaurants</span>
          <i className="fa fa-caret-down"></i>
        </button>

        <span id="search-bar-content">
          <input type="text" placeholder="Pizza, Ramen, Sushi..." id="search-bar"/>

          <div className="nav-bar-btn red-btn" id="search-bar-btn">
            <i className="fa fa-search"></i>
          </div>
        </span>

        <div className="contact-info-btn">
          <span><i className="fa fa-linkedin-square"></i></span>
          <span><i className="fa fa-github"></i></span>
        </div>

        <div className="nav-bar-btn auth-btn gray-btn" id="demo-btn">Demo</div>

        <div className="nav-bar-btn auth-btn gray-btn" id="login-btn">Log In</div>

        <div className="nav-bar-btn auth-btn red-btn" id="signup-btn">Sign Up</div>
      </div>

    </div>
  );
}

export default NavBar;