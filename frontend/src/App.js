import React from "react";
import HomePage from './components/HomePage/HomePage';
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from 'react-router-dom';
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";

export default function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={[<NavBar key={"hpNavBar"}/>, <HomePage key={"hp1"}/>]}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
      </Routes>
    </>
  );
}
