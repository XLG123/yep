import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

// The CSS Styling for this file are written on the FollowingList.css file because all the stylings are the same.

const FriendsList = ({ followees, followers, isCurrUser }) => {
  // console.log(followees);
  // console.log(followers);
  let followeeIds = [];
  let followerIds = [];

  if (followees) {
    Object.values(followees)?.forEach((followee) =>
      followeeIds.push(followee?.id)
    );
  }

  if (followers) {
    Object.values(followers)?.forEach((follower) =>
      followerIds.push(follower?.id)
    );
  }

  const navigate = useNavigate();

  const goToFriendProfilePage = (userId) => {
    navigate(`/user_details/${userId}`);
  };

  return (
    <>
      {followees && followers ? (
        <div className="friends-list-container">
          <div className="friends-title">Friends</div>
          <div className="friends-grid">
            {Object.values(followees)
              ?.filter(
                (followee) =>
                  followeeIds?.includes(followee?.id) &&
                  followerIds?.includes(followee?.id)
              )
              ?.reverse()?.length > 0 ? (
              Object.values(followees)
                ?.filter(
                  (followee) =>
                    followeeIds?.includes(followee?.id) &&
                    followerIds?.includes(followee?.id)
                )
                ?.reverse()
                ?.map((followee) => (
                  <div className="friend-container" key={followee.id}>
                    <div className="friend-avatar">
                      <Avatar
                        variant="rounded"
                        sx={{
                          backgroundColor: "#BBB",
                          width: "3.5vw",
                          height: "3.5vw",
                          fontSize: "1.4vw",
                        }}
                        onClick={(_e) => goToFriendProfilePage(followee?.id)}
                      >
                        {followee ? followee?.firstName[0] : null}
                        {followee ? followee?.lastName[0] : null}
                      </Avatar>
                    </div>
                    <div
                      className="friend-name"
                      onClick={(_e) => goToFriendProfilePage(followee?.id)}
                    >
                      {followee ? followee?.firstName : null}{" "}
                      {followee ? followee?.lastName[0] : null}.
                    </div>
                  </div>
                ))
            ) : (
              <div className="no-friends-msg">
                {isCurrUser
                  ? "Connect with other yepers to discover more fun."
                  : "This user has no friends on Yep."}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="empty-friends-list">
          <div className="friends-title">Friends</div>
          {isCurrUser
            ? "Connect with other yepers to discover more fun."
            : "This user has no friends on Yep."}
        </div>
      )}
    </>
  );
};

export default FriendsList;
