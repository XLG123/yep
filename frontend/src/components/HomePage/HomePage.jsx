import React from "react";
import FoodBG from "../FoodBG/FoodBG";
import Activity from '../Activity/Activity';
import Footer from "../Footer/Footer";
// import { Route, Routes } from 'react-router-dom';


const HomePage = () => {
  return(
    <>
      <FoodBG />
      <Activity />
      <Footer />
    </>
  );
}

export default HomePage;