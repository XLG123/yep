import "./FollowingList.css";
import Avatar from '@mui/material/Avatar';

const FollowingList = ({ followees, isCurrUser }) => {
  // console.log(followees);

  return (
    <>
      {followees ? (
        <div className="followees-list-container">
          <div className="followees-title">Following</div>
          <div className="followees-grid">
            {Object.values(followees)?.map((followee) => (
              <div className="followee-container" key={followee.id}>
                <Avatar variant="rounded"></Avatar>
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
