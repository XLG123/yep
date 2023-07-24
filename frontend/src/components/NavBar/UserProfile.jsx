import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import "./UserProfile.css";

const UserProfile = ({user}) => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState(false);

  const showProfile = () => {
    if (userProfile) return;
    setUserProfile(true);
  }

  useEffect(()=>{
    if (!userProfile) return;

    const hideProfile = () => {
      setUserProfile(false);
    }

    document.addEventListener('click', hideProfile);

    return() => document.removeEventListener('click', hideProfile);
  }, [userProfile]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  }

  return (
    <>
      <button id="user-pic" onClick={showProfile}>
        <i className="fa-solid fa-user-circle" />
      </button>

      {showProfile && (
        <ul id="user-profile">
          <li>{user.firstName} {user.lastName[0]}.</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default UserProfile;