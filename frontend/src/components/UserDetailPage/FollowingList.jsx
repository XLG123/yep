import { useNavigate } from "react-router-dom";
import "./FollowingList.css";
import Avatar from "@mui/material/Avatar";

const FollowingList = ({ followees, isCurrUser }) => {
  // console.log(followees);
  const navigate = useNavigate();

  const goToFolloweeProfilePage = (userId) => {
    navigate(`/user_details/${userId}`);
  };

  return (
    <>
      {followees ? (
        <div className="followees-list-container">
          <div className="followees-title">Following</div>
          <div className="followees-grid">
            {Object.values(followees)?.reverse()?.map((followee) => (
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
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-following-list">
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
