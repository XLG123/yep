import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import "./UserProfile.css";

const UserProfile = ({user}) => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState(false);

  const showProfile = () => {
    setUserProfile(!userProfile);
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  }

  return (
    <>
      <button id="user-pic" onClick={showProfile}>
        <div><i className="fa fa-user"></i></div>
      </button>

      { userProfile && (
        <ul id="user-profile">
          <li>{user.firstName} {user.lastName[0]}.</li>
          <li>{user.email}</li>
          <li>
            <button className="logout-btn" onClick={logout}>Log Out</button>
          </li>
        </ul>
      ) }
    </>
  );
}

export default UserProfile;