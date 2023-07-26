import React from "react";
import HomePage from './components/HomePage/HomePage';
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes, useLocation } from 'react-router-dom';
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import BusinessesPage from "./components/BusinessesPage/BusinessesPage";

export default function App() {

  let location = useLocation();

  return (
    <>
      <Routes>
        
        <Route exact path="/" element={[<NavBar location={location.pathname} key={"hpNavBar"}/>, <HomePage key={"hp"}/>]}></Route>

        <Route exact path="/login" element={<Login/>}></Route>

        <Route exact path="/signup" element={<SignUp />}></Route>

        <Route exact path="/search/:searchItem" element={[<NavBar location={location.pathname} key={"bpNavBar"}/>, <BusinessesPage key={"bp"}/>]}></Route>

      </Routes>
    </>
  );
}
