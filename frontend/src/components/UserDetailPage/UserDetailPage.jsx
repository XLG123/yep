import { useParams } from "react-router-dom";
import "./UserDetailPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getUsers } from "../../store/users";
import Avatar from "@mui/material/Avatar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import StarsIcon from "@mui/icons-material/Stars";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Footer from "../Footer/Footer";
import ReviewsList from "./ReviewsList";
import FriendsList from "./FriendsList";
import FollowingList from "./FollowingList";
import { createFriendship } from "../../store/friendships";

const UserDetailPage = () => {
  const userId = useParams().userId;
  // console.log(userId);

  const users = useSelector(getUsers);
  const user = users?.filter((user) => user.id === parseInt(userId))[0];

  const currUser = useSelector((state) => state.session.user);

  // console.log(user);
  // console.log(currUser);

  const [listBtn, setListBtn] = useState("reviews");

  // console.log(listBtn);

  const followUser = () => {
    const newFriendshipObj = {
      follower_id: currUser?.id,
      followee_id: user?.id,
    };
    dispatch(createFriendship(newFriendshipObj));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [userId, dispatch]);

  return (
    <>
      <div className="user-detail-page-line-break"></div>

      <div className="user-detail-container">
        <div className="user-info-container">
          {/* container that has all the basic info of a user */}
          <div className="basic-info-container">
            <div className="bg-red-banner"></div>

            <div className="user-image-container">
              <Avatar
                sx={{
                  backgroundColor: "#999",
                  height: "6.2vw",
                  width: "6.2vw",
                  fontSize: "2.8vw",
                  border: "0.12em solid white",
                  marginTop: "0.5em",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {user?.firstName[0]}
                {user?.lastName[0]}
              </Avatar>
            </div>

            <div className="username-container">
              {user?.firstName} {user?.lastName}
            </div>

            <div className="user-joined-time-container">
              Became a yeper since{" "}
              <span className="joined-time">
                {new Date(user?.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {user?.id !== currUser?.id ? (
              currUser?.followees &&
              (Object.values(currUser?.followees).filter(
                (followee) => followee?.id === user?.id
              )?.length !== 0 ? (
                <div className="follow-btn">
                  <PersonAddIcon
                    sx={{
                      width: "1.7vw",
                      height: "1.7vw",
                      color: "#777",
                      cursor: "pointer",
                      padding: "0.35vw",
                      borderRadius: "50%",
                      backgroundColor: "#EBEBEB",
                      marginBottom: "0.1em",
                      "&:hover": { color: "#2D2E2F" },
                    }}
                    onClick={(e) => followUser()}
                  />
                  <div className="follow-btn-text">Follow</div>
                </div>
              ) : (
                <div className="unfollow-btn">
                  <PersonRemoveIcon
                    sx={{
                      width: "1.7vw",
                      height: "1.7vw",
                      color: "#777",
                      cursor: "pointer",
                      padding: "0.35vw",
                      borderRadius: "50%",
                      backgroundColor: "#EBEBEB",
                      marginBottom: "0.1em",
                      "&:hover": { color: "#2D2E2F" },
                    }}
                  />
                  <div className="unfollow-btn-text">Unfollow</div>
                </div>)
              )
            ) : null}
          </div>

          {/* button group for users to look at their reviewed restaurants, friends, and other users that they follow */}
          <div className="list-btn-group">
            <div
              className="list-btn"
              id={listBtn === "reviews" ? "reviews-list-btn" : null}
              onClick={(e) => setListBtn("reviews")}
            >
              <span className="list-btn-icon">
                <StarsIcon sx={{ fontSize: "1.75vw", color: "#5A5C5E" }} />
              </span>
              <span className="list-btn-text">Reviews</span>
            </div>

            <div
              className="list-btn"
              id={listBtn === "friends" ? "friends-list-btn" : null}
              onClick={(e) => setListBtn("friends")}
            >
              <span className="list-btn-icon">
                <Diversity3Icon sx={{ fontSize: "1.75vw", color: "#5A5C5E" }} />
              </span>
              <span className="list-btn-text">Friends</span>
            </div>

            <div
              className="list-btn"
              id={listBtn === "following" ? "following-list-btn" : null}
              onClick={(e) => setListBtn("following")}
            >
              <span className="list-btn-icon">
                <HowToRegIcon sx={{ fontSize: "1.75vw", color: "#5A5C5E" }} />
              </span>
              <span className="list-btn-text">Following</span>
            </div>
          </div>
        </div>

        <div className="list-container">
          {listBtn === "reviews" ? (
            <ReviewsList
              reviews={user?.reviews}
              isCurrUser={user?.id === currUser?.id ? true : false}
              currUserId={currUser?.id}
            />
          ) : listBtn === "friends" ? (
            <FriendsList />
          ) : (
            <FollowingList />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserDetailPage;
