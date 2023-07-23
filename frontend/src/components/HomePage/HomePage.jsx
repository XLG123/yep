import React from "react";
import NavBar from '../NavBar/NavBar';
import FoodBG from "../FoodBG/FoodBG";
import Activity from '../Activity/Activity';


const HomePage = () => {
  return(
    <>
      {/* <h1>Hello From Home Page</h1> */}
      <NavBar />
      <FoodBG />
      <Activity />
    </>
  );
}

export default HomePage;