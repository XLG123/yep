import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import yepUserAuth from "../../assets/images/yepUserAuth.png";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [errorMsgBtn, setErrorMsgBtn] = useState(false);

  if (sessionUser) return <Navigate to="/" />;

  const handleLogin = (e) => {
    e.preventDefault();
    let loginErrors = [];

    // Frontend Log In Form Validation
    // Before validating the email and password in the backend
    if (!email) {
      loginErrors.push("Email is blank or the format is incorrect");
    }

    if (!password) {
      loginErrors.push("Password is blank");
    }

    setErrors(loginErrors);

    if (loginErrors.length > 0) {
      setErrorMsgBtn(true);
    } else {
      setErrorMsgBtn(false);
    }

    if (loginErrors.length === 0) {
      setErrors([]);
      return dispatch(sessionActions.login({ email, password })).catch(
        async (res) => {
          let data;
          try {
            // .clone() essentially allows you to read the response body twice
            data = await res.clone().json();
          } catch {
            data = await res.text(); // Will hit this case if, e.g., server is down
          }
          if (data?.errors) {
            setErrors(data.errors);
            setErrorMsgBtn(true);
          } else if (data) {
            setErrors([data]);
            setErrorMsgBtn(true);
          } else {
            setErrors([res.statusText]);
            setErrorMsgBtn(true);
          }
        }
      );
    }
  };

  const closeErrorMsg = (e) => {
    setErrorMsgBtn(false);
  };

  return (
    <>
      <div className="login-page">
        <div className="line-break"></div>

        {errorMsgBtn && (
          <div id="login-errors">
            <i className="fa fa-close" onClick={(e) => closeErrorMsg(e)}></i>
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div id="login-form-container">
          <h1 id="login-title">Log In To Yep!</h1>

          <p id="signup-link-1">
            New to Yep?{" "}
            <NavLink to="/signup" className="signup-link">
              Sign up
            </NavLink>
          </p>

          <div id="yep-msg">
            By continuing, you agree to Yep's{" "}
            <a href="https://terms.yelp.com/tos/en_us/20200101_en_us/">
              Terms of Service
            </a>{" "}
            and acknowledge Yep's{" "}
            <a href="https://terms.yelp.com/privacy/en_us/20220831_en_us/">
              Privacy Policy
            </a>
            .
          </div>

          <form onSubmit={handleLogin}>
            <div className="line-break login-form-lb"></div>

            <div id="login-user-email">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="login-email"
                className="login-input"
              />
            </div>

            <div id="login-user-password">
              <input
                type="password"
                name="password"
                placeholder="Password"
                minLength="8"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="login-password"
                className="login-input"
              />
            </div>

            <button id="submit-login-btn">Log In</button>

            <p id="signup-link-2">
              <span>New to Yep? </span>
              <NavLink to="/signup" className="signup-link">
                Sign Up
              </NavLink>
            </p>
          </form>
        </div>

        <div id="login-form-pic">
          <img src={yepUserAuth} alt="User Auth" />
        </div>
      </div>
    </>
  );
};

export default Login;
