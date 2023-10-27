import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const FriendsList = ({ followees, followers, isCurrUser }) => {
  console.log(followees);
  console.log(followers);

  const navigate = useNavigate();

  const goToFriendProfilePage = (userId) => {
    navigate(`/user_details/${userId}`);
  };
  
  return (
    <>
      {}
    </>
  );
}

export default FriendsList;