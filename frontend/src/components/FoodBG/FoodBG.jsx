import React from "react";
import "./FoodBG.css";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const FoodBG = () => {
  const navigate = useNavigate();

  const getToBusinessPage = () => {
    navigate("/restaurants");
  };

  return (
    <div id="food-bg">
      <div className="greeting-text">
        <div>Looking for </div>
        <div>local restaurants?</div>
      </div>
      <div className="explore-btn" onClick={(e) => getToBusinessPage()}>
        Explore <LoginIcon sx={{ fontSize: "1.5vw", marginLeft: "0.3em" }} />
      </div>
    </div>
  );
};

export default FoodBG;
