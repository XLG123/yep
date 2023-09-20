import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./UserProfile.css";
// import Avatar from "@mui/material/Avatar"; //avatar for users

const UserProfile = ({ user }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const currentLink = window.location.href;

  const [userProfile, setUserProfile] = useState(false);

  useEffect(() => {
    const closeProfile = (e) => {
      if (userProfile && ref.current && !ref.current.contains(e.target)) {
        setUserProfile(false);
      }
    };

    document.addEventListener("click", closeProfile);

    return () => {
      document.removeEventListener("click", closeProfile);
    };
  }, [userProfile]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <span ref={ref}>
        <button id="user-pic" onClick={() => setUserProfile((show) => !show)}>
          <div>
            <i className="fa fa-user"></i>
          </div>
        </button>

        {userProfile && (
          <ul
            id="user-profile"
            className={
              currentLink.includes("restaurants/1") ||
              currentLink.includes("restaurants/2") ||
              currentLink.includes("restaurants/3") ||
              currentLink.includes("restaurants/4")
                ? "non-hp-profile"
                : "hp-profile"
            }
          >
            <li>
              {user.firstName} {user.lastName[0]}.
            </li>
            <li>{user.email}</li>
            <li>
              <button className="logout-btn" onClick={logout}>
                Log Out
              </button>
            </li>
          </ul>
        )}
      </span>
    </>
  );
};

export default UserProfile;
