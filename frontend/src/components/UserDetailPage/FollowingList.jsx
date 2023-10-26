import "./FollowingList.css";

const FollowingList = ({ followees, isCurrUser }) => {
  console.log(followees);

  return (
    <>
      {followees ? (
        <div className=""></div>
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
