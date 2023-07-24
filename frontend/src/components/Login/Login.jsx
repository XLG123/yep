import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import yepLogo from "../../assets/images/yepLogo2.png";
import yepUserAuth from "../../assets/images/yepUserAuth.png";
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({email, password}));

    // TODO: validating email and password errors 
  }

  if (sessionUser) return <Navigate to="/" />;

  return (
    <>
      <div className="login-page">

        <NavLink to="/" className="back-to-hp-link">
          <div id="app-title-container">
            <h1 id="login-app-title">yep!</h1>
            <img src={yepLogo} alt="Yep Logo" id="login-app-logo" />
          </div>
        </NavLink>

        <div className="line-break"></div>

        <div id="login-form-container">
          <h1 id="login-title">Log In To Yep!</h1>

          <p id="signup-link-1">New to Yep? <NavLink to="/signup" className="signup-link">Sign up</NavLink></p>

          <div id="yep-msg">By continuing, you agree to Yep's
            <a href="https://terms.yelp.com/tos/en_us/20200101_en_us/"> Terms of Service</a> and acknowledge Yep's
            <a href="https://terms.yelp.com/privacy/en_us/20220831_en_us/"> Privacy Policy</a>.
          </div>

          <form onSubmit={handleLogin}>

            <div className="line-break" id="login-line-break"></div>

            <div id="login-user-email">
              <input type="email" name="email" placeholder="Email" required="required" value={email} onChange={(e) => { setEmail(e.target.value) }} id="login-email" className="login-input" />
            </div>

            <div id="login-user-password">
              <input type="password" name="password" placeholder="Password"
                minLength="8" value={password} onChange={(e) => { setPassword(e.target.value) }} required="required" id="login-password" className="login-input" />
            </div>

            <button id="submit-login-btn">Log In</button>

            <p id="signup-link-2"><span>New to Yep? </span><NavLink to="/signup" className="signup-link">Sign Up</NavLink></p>

          </form>

        </div>

        <div id="login-form-pic">
          <img src={yepUserAuth} alt="User Auth" />
        </div>

      </div>
    </>
  );
}

export default Login;