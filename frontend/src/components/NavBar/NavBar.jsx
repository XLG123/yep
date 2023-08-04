import React from "react";
import './NavBar.css';
import yepLogo1 from '../../assets/images/yepLogo1.png';
import yepLogo2 from '../../assets/images/yepLogo2.png';
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import UserProfile from "./UserProfile";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CategoryMenu from "../Category/Category";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  let location_path = location.pathname;

  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({
      email: "demoUser@gmail.com",
      password: "12345678",
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

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/restaurants', {replace: true});
  }

  return (
    <div className={location_path === "/" ? "hp" : "non-hp"} id="nav-bar">

      <div id="nav-bar-content">

        <span id="back-to-hp">
          <NavLink to="/" className="title-nav-link">
            <h1 id="app-title">yep!</h1>
            <img src={location_path === "/" ? yepLogo1 : yepLogo2} alt="Yep Logo" className={location_path === "/" ? "hp-logo" : "non-hp-logo"} id="app-logo"/>
          </NavLink>
        </span>

        <button id="category-btn" onClick={(e) => handleClick(e)}>
          <span>Restaurants</span>
          <i className="fa fa-caret-down"></i>
        </button>
        <CategoryMenu location={location_path} />

        <SearchBar/>

        <div className="contact-info-btn">
          <span>
            <a href="https://www.linkedin.com/in/xiaolinguan" target="_blank" rel="noreferrer"><i className="fa fa-linkedin-square"></i></a>
          </span>
          
          <span>
            <a href="https://github.com/XLG123/yep" target="_blank" rel="noreferrer">
              <i className="fa fa-github"></i>
            </a>
          </span>
        </div>

        {sessionLinks}
        
      </div>

    </div>
  );
}

export default NavBar;