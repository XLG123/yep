import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./UserDetailPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchUsers, getUsers } from "../../store/users";
import Avatar from "@mui/material/Avatar";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import StarsIcon from "@mui/icons-material/Stars";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Footer from "../Footer/Footer";
import ReviewsList from "./ReviewsList";
import FriendsList from "./FriendsList";
import FollowingList from "./FollowingList";
import {
  createFriendship,
  deleteFriendship,
  fetchFriendships,
  getFriendships,
} from "../../store/friendships";

const UserDetailPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location_path = useLocation().pathname;
  // console.log(location_path);

  const userId = useParams().userId;
  // console.log(userId);

  const users = useSelector(getUsers);
  const user = users?.filter((user) => user.id === parseInt(userId))[0];

  const sessionUser = useSelector((state) => state.session.user);

  // console.log(user);
  // console.log(sessionUser);

  const [listBtn, setListBtn] = useState("reviews");

  // console.log(listBtn);

  const currUser = useSelector((state) => state.users.currentUser);
  // console.log(currUser);

  const friendships = useSelector(getFriendships);

  const followUser = () => {
    if (sessionUser) {
      const newFriendshipObj = {
        follower_id: sessionUser?.id,
        followee_id: user?.id,
      };
      dispatch(createFriendship(newFriendshipObj));
    } else {
      navigate("/login");
    }
  };

  const unfollowUser = (friendshipId) => {
    dispatch(deleteFriendship(friendshipId));
    dispatch(fetchFriendships());
  };

  let followeeIds = [];
  let followerIds = [];
  let friendIds = [];
  let nonFriendIds = [];
  if (currUser?.followees) {
    Object.values(currUser?.followees)?.forEach((followee) =>
      followeeIds.push(followee?.id)
    );
  }

  if (currUser?.followers) {
    Object.values(currUser?.followers)?.forEach((follower) =>
      followerIds.push(follower?.id)
    );
  }

  if (followeeIds?.length > 0 && followerIds?.length > 0) {
    for (let i = 0; i < followeeIds.length; ++i) {
      if (followerIds.includes(followeeIds[i])) {
        friendIds.push(followeeIds[i]);
      }
    }

    for (let i = 0; i < followeeIds.length; ++i) {
      if (!followerIds.includes(followeeIds[i])) {
        nonFriendIds.push(followeeIds[i]);
      }
    }
  }

  // console.log(followeeIds);
  // console.log(followerIds);
  // console.log(friendIds);
  // console.log(nonFriendIds);

  useEffect(() => {
    dispatch(fetchUsers());
    if (sessionUser) {
      dispatch(fetchUser(sessionUser?.id));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (sessionUser) {
      dispatch(fetchUser(sessionUser?.id));
    }
  }, [friendships?.length]);

  useEffect(() => {
    dispatch(fetchFriendships());
  }, [dispatch]);

  useEffect(() => {
    setListBtn("reviews");
  }, [location_path]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [friendships?.length]);

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

            {user?.id === sessionUser?.id ? (
              <div className="user-profile-status-container">
                <div className="user-review-status">
                  <span className="status-icon">
                    <StarsIcon sx={{ fontSize: "1.6vw" }}/>
                  </span>
                  <span className="status-description">
                    {user?.reviewsCount}{" "}
                  </span>
                </div>

                <div className="user-friends-status">
                  <span className="status-icon">
                    <Diversity3Icon sx={{ fontSize: "1.6vw" }}/>
                  </span>
                  <span className="status-description">
                    {user?.followees && user?.followers ? (
                      <div>{friendIds?.length > 0 ? friendIds?.length : 0}</div>
                    ) : (
                      0
                    )}
                  </span>
                </div>

                <div className="user-following-status">
                  <span className="status-icon">
                    <HowToRegIcon sx={{ fontSize: "1.6vw" }}/>
                  </span>
                  <span className="status-description">
                    {followeeIds?.length === 0 && followerIds?.length === 0
                      ? 0
                      : followeeIds?.length > 0 && followerIds?.length === 0
                      ? followeeIds?.length
                      : followeeIds?.length === 0 && followerIds?.length > 0
                      ? 0
                      : followeeIds.length > 0 && followerIds?.length > 0
                      ? nonFriendIds?.length
                      : null}
                  </span>
                </div>
              </div>
            ) : null}

            {/* If the current user is on another user's profile page, display either a follow button or an unfollow button. Otherwise, don't display any buttons. */}

            {/* If the current user has followees, check if the current profile's owner is being followed by the current user. */}
            {user?.id !== sessionUser?.id ? (
              currUser?.followees ? (
                Object.values(currUser?.followees)?.filter(
                  (followee) => followee?.id === user?.id
                )?.length === 0 ? (
                  <div className="follow-btn">
                    <PersonAddAlt1Icon
                      sx={{
                        width: "1.7vw",
                        height: "1.7vw",
                        color: "#777",
                        cursor: "pointer",
                        padding: "0.35vw",
                        borderRadius: "50%",
                        backgroundColor: "#EBEBEB",
                        marginBottom: "0.1em",
                        "&:hover": { color: "#666" },
                      }}
                      onClick={(_e) => followUser()}
                    />
                    <div className="follow-btn-text">Follow</div>
                  </div>
                ) : sessionUser ? (
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
                        "&:hover": { color: "#666" },
                      }}
                      onClick={(_e) =>
                        unfollowUser(
                          Object.values(
                            currUser?.followeeRelationships
                          )?.filter(
                            (followeeRelationship) =>
                              followeeRelationship.followeeId === user?.id
                          )[0]?.id
                        )
                      }
                    />
                    <div className="unfollow-btn-text">Unfollow</div>
                  </div>
                ) : (
                  <div className="follow-btn">
                    <PersonAddAlt1Icon
                      sx={{
                        width: "1.7vw",
                        height: "1.7vw",
                        color: "#777",
                        cursor: sessionUser ? "pointer" : "not-allowed",
                        padding: "0.35vw",
                        borderRadius: "50%",
                        backgroundColor: "#EBEBEB",
                        marginBottom: "0.1em",
                        "&:hover": { color: "#666" },
                      }}
                      onClick={(_e) => followUser()}
                    />
                    <div className="follow-btn-text">Follow</div>
                  </div>
                )
              ) : (
                <div className="follow-btn">
                  <PersonAddAlt1Icon
                    sx={{
                      width: "1.7vw",
                      height: "1.7vw",
                      color: "#777",
                      cursor: sessionUser ? "pointer" : "not-allowed",
                      padding: "0.35vw",
                      borderRadius: "50%",
                      backgroundColor: "#EBEBEB",
                      marginBottom: "0.1em",
                      "&:hover": { color: "#666" },
                    }}
                    onClick={(_e) => followUser()}
                  />
                  <div className="follow-btn-text">Follow</div>
                </div>
              )
            ) : null}
          </div>

          {/* button group for users to look at their reviewed restaurants, friends, and other users that they follow */}
          <div className="list-btn-group">
            <div
              className="list-btn"
              id={listBtn === "reviews" ? "reviews-list-btn" : null}
              onClick={(_e) => setListBtn("reviews")}
            >
              <span className="list-btn-icon">
                <StarsIcon sx={{ fontSize: "1.75vw", color: "#5A5C5E" }} />
              </span>
              <span className="list-btn-text">Reviews</span>
            </div>

            <div
              className="list-btn"
              id={listBtn === "friends" ? "friends-list-btn" : null}
              onClick={(_e) => setListBtn("friends")}
            >
              <span className="list-btn-icon">
                <Diversity3Icon sx={{ fontSize: "1.75vw", color: "#5A5C5E" }} />
              </span>
              <span className="list-btn-text">Friends</span>
            </div>

            <div
              className="list-btn"
              id={listBtn === "following" ? "following-list-btn" : null}
              onClick={(_e) => setListBtn("following")}
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
              isCurrUser={user?.id === sessionUser?.id ? true : false}
              currUserId={sessionUser?.id}
            />
          ) : listBtn === "friends" ? (
            <FriendsList
              followees={user?.followees}
              followers={user?.followers}
              isCurrUser={user?.id === sessionUser?.id ? true : false}
            />
          ) : (
            <FollowingList
              followees={user?.followees}
              followers={user?.followers}
              followeesCount={user?.followeesCount}
              isCurrUser={user?.id === sessionUser?.id ? true : false}
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserDetailPage;
