import { useParams } from "react-router-dom";
import "./UserDetailPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getUsers } from "../../store/users";

const UserDetailPage = () => {

  const userId = useParams().userId;
  // console.log(userId);

  const users = useSelector(getUsers);
  const user = users.filter((user) => user.id === parseInt(userId));

  const currUser = useSelector((state) => state.session.user);

  // console.log(user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [userId])

  return (
    <>
      <div className="user-detail-page-line-break"></div>

      <div className="user-detail-container">

        <div className="user-info-container">
          <div className="basic-info-container">
            <div className="bg-red-banner"></div>
            <div className="user-image-container"></div>
            <div className="username-container"></div>
            <div className="user-joined-time-container"></div>
          </div>

          <div className="list-btn-group">
            <div className="list-btn">Reviews</div>
            <div className="list-btn">Friends</div>
            <div className="list-btn">Following</div>
          </div>
        </div>

        <div className="list-container">list</div>
      </div>

    </>
  )
}

export default UserDetailPage;