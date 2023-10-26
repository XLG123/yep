import "./FollowingList.css";

const FollowingList = ({ followees, isCurrUser }) => {
  // console.log(followees);

  return (
    <>
      {followees ? (
        <div className="followees-list">
          <div className="followees-title">Following</div>
          {Object.values(followees)?.map((followee) => (
            <div className="followee-container" key={followee.id}>
              {followee?.id}
            </div>
          ))}
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
