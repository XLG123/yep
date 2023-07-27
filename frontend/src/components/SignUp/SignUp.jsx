import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import * as sessionActions from "../../store/session";
import yepUserAuth from "../../assets/images/yepUserAuth.png";
import PasswordStrengthBar from 'react-password-strength-bar';
import './SignUp.css';

const SignUp = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errors, setErrors] = useState([]);
  const [errorMsgBtn, setErrorMsgBtn] = useState(false);

  if (sessionUser) return <Navigate to="/" />;
  
  const handleSignUp = (e) => {
    e.preventDefault();
    let signUpErrors = [];
    
    // Frontend Sign Up Form Validation
    // Before validating all the data in the backend
    if (!firstName) {
      signUpErrors.push("First Name can't be blank");
    } 

    if (!lastName) {
      signUpErrors.push("Last Name can't be blank");
    }

    let emailRegex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|([]!#-[^-~\\t]|(\\[\\t -~]))+)@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\\t -Z^-~]*])");
    if (!emailRegex.test(email)) {
      signUpErrors.push("Email is blank or the format is incorrect");
    } 

    if (password.length < 8) {
      signUpErrors.push("Please choose a password of at least 8 characters");
    }

    if (!/^[0-9]+$/.test(zipCode)) {
      signUpErrors.push("Oops, looks like an invalid ZIP code");
    }

    setErrors(signUpErrors);

    if (signUpErrors.length > 0) {
      setErrorMsgBtn(true);
    } else {
      setErrorMsgBtn(false);
    }

    // Backend Sign Up Form Validation
    if (signUpErrors.length === 0) {
      setErrors([]);
      return dispatch(sessionActions.signup({ 
        firstName, lastName, email, zipCode, password }))
        .catch(async (res) => {
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
        });
    }
  }

  const closeErrorMsg = (e) => {
    setErrorMsgBtn(false);
  }

  const months = ['Month', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const populateMonth = () => {
    return (
      <select name="user-month" id="dob-month" className="signup-input 
      dropdown-btn">
        {months.map((month) => {
          return <option key={month}>{month}</option>
        })}
      </select>
    );
  }
 
  const days = ['Day'];
  for (let i = 1; i <= 31; ++i) {
    days.push(i);
  }

  const populateDay = () => {
    return (
      <select name="user-day" id="dob-day" className="signup-input 
      dropdown-btn">
        {days.map((day) => {
          return <option key={day}>{day}</option>
        })}
      </select>
    );
  }

  const years = ['Year'];
  for (let i = 2023; i >= 1901; --i) {
    years.push(i);
  }

  const populateYear = () => {
    return (
      <select name="user-year" id="dob-year" className="signup-input 
      dropdown-btn">
        {years.map((year) => {
          return <option key={year}>{year}</option>
        })}
      </select>
    );
  }

  return (
    <>
      <div className="sign-up-page">

        <div className="line-break"></div>

        { errorMsgBtn && 
          <div id="sign-up-errors">
            <i className="fa fa-close" onClick={(e) => closeErrorMsg(e)}></i>
            <ul>
              {errors.map((error) => <li key={error}>{error}</li>)}
            </ul>
          </div> }

        <div id="sign-up-form-container">
          <h1 id="sign-up-title">Sign Up For Yep!</h1>

          <div id="sub-title">Connect with great local businesses</div>

          <div id="yep-msg">By continuing, you agree to Yep's 
            <a href="https://terms.yelp.com/tos/en_us/20200101_en_us/"> Terms of Service</a> and acknowledge Yep's 
            <a href="https://terms.yelp.com/privacy/en_us/20220831_en_us/"> Privacy Policy</a>.
          </div>

          <form onSubmit={handleSignUp}>

            <div className="line-break"></div>

            <div id="username">
              <input type="text" name="firstname" placeholder="First Name"  value={firstName} onChange={(e) => {setFirstName(e.target.value)}} id="firstname" className="signup-input"/>

              <input type="text" name="lastname" placeholder="Last Name"  value={lastName} onChange={(e) => {setLastName(e.target.value)}} id="lastname" className="signup-input"/>
            </div>

            <div id="user-email">
              <input type="email" name="email" placeholder="Email"  value={email} onChange={(e) => {setEmail(e.target.value)}} id="email" className="signup-input"/>
            </div>

            <div id="user-password">
              <input type="password" name="password" placeholder="Password"
              minLength="8" value={password} onChange={(e) => {setPassword(e.target.value)}} id="password" className="signup-input" />
              <PasswordStrengthBar password={password} minLength={3} scoreWords={['too weak', 'weak', 'okay', 'good', 'strong']} className="password-bar"/>
            </div>

            <div id="user-zipcode">
              <input type="text" name="zipcode" placeholder="ZIP Code"
              minLength="5" maxLength="5" value={zipCode} onChange={(e) => {setZipCode(e.target.value)}} id="zipcode" 
              className="signup-input" />
            </div>

            <div id="user-dob">
              <p><span>Birthday </span><span>Optional</span></p>
              <span>
                {populateMonth()}
              </span>

              <span>
                {populateDay()}                
              </span>

              <span>
                {populateYear()}
              </span>
            </div>

            <button id="submit-signup-btn">Sign Up</button>

            <p id="login-link-1"><span>Already on Yep? </span><NavLink to="/login" className="login-link">Log in</NavLink></p>

          </form>

        </div>

        <div id="sign-up-form-pic">
          <img src={yepUserAuth} alt="User Auth" />
        </div>

      </div>
    </>
  );
}

export default SignUp;