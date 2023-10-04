import React from "react";
import HomePage from './components/HomePage/HomePage';
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from 'react-router-dom';
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import BusinessesPage from "./components/BusinessesPage/BusinessesPage";
import FilteredResult from "./components/BusinessesPage/Filter/FilteredResult";
import RestaurantShowPage from "./components/BusinessesPage/RestaurantShowPage";
import SearchResult from "./components/SearchBar/SearchResult";
import SearchError from "./components/SearchBar/SearchError";
import WriteReview from "./components/Review/WriteReview";
import UpdateReview from "./components/Review/UpdateReview";
import SeeYouSoon from "./components/SeeYouSoon/SeeYouSoon";
import ErrorUrl from "./components/ErrorUrl/ErrorUrl";

export default function App() {

  return (
    <>
      <NavBar />
      <Routes>

        <Route exact path="/" element={ <HomePage key={"hp"} />}></Route>

        <Route exact path="/login" element={<Login />}></Route>

        <Route exact path="/signup" element={<SignUp />}></Route>

        <Route exact path="/restaurants" element={<BusinessesPage />}></Route>

        <Route exact path="/restaurants/:restaurantId" element=
        {<RestaurantShowPage/>}></Route>

        <Route path="/restaurants/filter" element={<FilteredResult />}>
        </Route>

        <Route exact path="/businesses/search" element={<SearchResult />}>
        </Route>
        
        <Route exact path="/businesses/error" element={<SearchError />}>
        </Route>

        <Route exact path="/restaurants/:restaurantId/writeareview" 
          element={<WriteReview/>}></Route>

        <Route exact path="/reviews/:reviewId/updateareview" 
          element={<UpdateReview/>}></Route>

        <Route exact path="/seeyousoon" element={<SeeYouSoon />}></Route>

        <Route exact path="/:errorurl" element={<ErrorUrl />}></Route>

      </Routes>
    </>
  );
}
 