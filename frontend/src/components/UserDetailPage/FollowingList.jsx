import { useNavigate } from "react-router-dom";
import "./FollowingList.css";
import Avatar from "@mui/material/Avatar";

const FollowingList = ({
  followees,
  followers,
  followeesCount,
  isCurrUser,
}) => {
  // console.log(followees);
  // console.log(followers);
  let followeeIds = [];
  let followerIds = [];
  let nonFriendIds = [];
  let friendIds = [];

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

  if (followees && followers) {
    nonFriendIds = followeeIds.filter(
      (followeeId) => !followerIds.includes(followeeId)
    );

    friendIds = followeeIds.filter((followeeId) =>
      followerIds.includes(followeeId)
    );
  }

  // console.log(nonFriendIds);
  // console.log(friendIds);

  if (nonFriendIds.length === 0 && friendIds.length === 0) {
    nonFriendIds = followeeIds;
  }

  // console.log(followeeIds);
  // console.log(followerIds);
  // console.log(nonFriendIds);
  // console.log(friendIds);

  const navigate = useNavigate();

  const goToFolloweeProfilePage = (userId) => {
    navigate(`/user_details/${userId}`);
  };

  // TODO: Check the length of the array before map()
  // when it's greater than 0, map it.
  // else, display => check friends list.
  return (
    <>
      {followees ? (
        <div className="followees-list-container">
          <div className="followees-title">Following</div>
          <div className="followees-grid">
            {Object.values(followees)
              ?.filter((followee) => nonFriendIds?.includes(followee?.id))
              ?.reverse()?.length > 0 ? (
              Object.values(followees)
                ?.filter((followee) => nonFriendIds?.includes(followee?.id))
                ?.reverse()
                ?.map((followee) => (
                  <div className="followee-container" key={followee.id}>
                    <div className="followee-avatar">
                      <Avatar
                        variant="rounded"
                        sx={{
                          backgroundColor: "#BBB",
                          width: "3.5vw",
                          height: "3.5vw",
                          fontSize: "1.4vw",
                        }}
                        onClick={(_e) => goToFolloweeProfilePage(followee?.id)}
                      >
                        {followee ? followee?.firstName[0] : null}
                        {followee ? followee?.lastName[0] : null}
                      </Avatar>
                    </div>
                    <div
                      className="followee-name"
                      onClick={(_e) => goToFolloweeProfilePage(followee?.id)}
                    >
                      {followee ? followee?.firstName : null}{" "}
                      {followee ? followee?.lastName[0] : null}.
                    </div>
                  </div>
                ))
            ) : (
              <div className="following-list-msg">
                {isCurrUser ? (
                  <div>
                    You are currently following{" "}
                    <span className="followees-count">{followeesCount} yeper(s)</span> and you are friends
                    with all of them.
                  </div>
                ) : (
                  <div>
                    This user is currently following{" "}
                    <span className="followees-count">{followeesCount} yeper(s)</span> and friends with all of
                    them.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="empty-following-list">
          <div className="followees-title">Following</div>
          {isCurrUser ? (
            <div>
              <p>It's not too late to connect with people.</p>
              <p>Follow other yepers to explore more local restaurants.</p>
            </div>
          ) : (
            "This user is not following anyone on Yep."
          )}
        </div>
      )}
    </>
  );
};

export default FollowingList;
