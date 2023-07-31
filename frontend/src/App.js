import React from "react";
import HomePage from './components/HomePage/HomePage';
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from 'react-router-dom';
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import BusinessesPage from "./components/BusinessesPage/BusinessesPage";
import FilteredResult from "./components/BusinessesPage/Filter/FilteredResult";

export default function App() {
  
  return (
    <>
      <NavBar />
      <Routes>

        <Route exact path="/" element={ <HomePage key={"hp"}/>}></Route>

        <Route exact path="/login" element={<Login/>}></Route>

        <Route exact path="/signup" element={<SignUp />}></Route>

        <Route exact path="/restaurants" element={<BusinessesPage />}></Route>

        <Route exact path="/restaurants/:filteredItem" element={<FilteredResult/>}></Route>


        {/* <Route exact path="/restaurants/:searchItem" element={<BusinessesPage key={"sp"}/>}></Route> */}


      </Routes>
    </>
  );
}
