import React from "react";
import './NavBar.css';
import yepLogo from '../../assets/images/yepLogo1.png';
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
// import SignUp from "../SignUp/SignUp";
import UserProfile from "./UserProfile";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({
      email: "demoUser@login.com",
      password: "imademouser",
    }));
  }

  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (<UserProfile user={sessionUser}/>);
  } else {
    sessionLinks = (
      <>
        <div className="nav-bar-btn auth-btn gray-btn" id="demo-btn" onClick={demoLogin}>Demo</div>

        <NavLink to="/login" className="navlink">
          <div className="nav-bar-btn auth-btn gray-btn" id="login-btn">Log In</div>
        </NavLink>

        <NavLink to="/signup" className="navlink">
          <div className="nav-bar-btn auth-btn red-btn" id="signup-btn">Sign Up</div>
        </NavLink>
      </>
    );
  }

  return (
    <div id="nav-bar">

      <div id="nav-bar-content">

        <span id="refresh-hp" onClick={() => {window.location.reload(false)}}>
          <h1 id="app-title">yep!</h1>

          <img src={yepLogo} alt="Yep Logo" id="app-logo"/>
        </span>

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

        {sessionLinks}

      </div>

    </div>
  );
}

export default NavBar;