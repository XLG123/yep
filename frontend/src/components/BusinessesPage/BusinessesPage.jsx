import React, { useEffect, useState } from "react";
import "./BusinessesPage.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants, fetchRestaurants } from "../../store/restaurants";
import Restaurant from './Restaurant';
import Loading from '../Loading/Loading';
import MapBuilder from "../MapBuilder/MapBuilder";

const BusinessesPage = () => {
  const dispatch = useDispatch();
  const searchItem = useParams().searchItem;
  const restaurants = useSelector(getRestaurants);
  const [finishLoading, setFinishLoading] = useState(false);
  
  // Randomize all the restaurants
  const randomizeRestaurants = (restaurants) => {
    for (let i = restaurants.length - 1; i > 0; --i) {
      const j = Math.floor(Math.random() * (i + 1));
      [restaurants[i], restaurants[j]] = [restaurants[j], restaurants[i]];
    }
  }

  useEffect(() => {
    dispatch(fetchRestaurants());
    setTimeout(() => {
      setFinishLoading(true);
    }, 2000);
  }, [dispatch]);

  return (
    <>
      {randomizeRestaurants(restaurants)}
      <div className="bp-line-break"></div>
      {!finishLoading ? <Loading /> :
        <div className="business-page-container">

          <div className="left-side-bar">
            <div className="filter-bar-container">
              <div className="filter-title">Price Range Filter</div>
              <div className="filter">
                <button className="filter-btn-group" id="filter-btn-1">
                  $</button>
                <button className="filter-btn-group" id="filter-btn-2">
                  $$</button>
                <button className="filter-btn-group" id="filter-btn-3">
                  $$$</button>
                <button className="filter-btn-group" id="filter-btn-4">
                  $$$$</button>
              </div>
            </div>

            <div className="recommendation-container">

            </div>
          </div>
          
          <div className="main-content">
            <div className="search-result-container">
              <h1 className="search-result-title">
                {searchItem ? `${searchItem} Cuisine` : "Restaurants"}</h1>
                <div className="scrollable-result-container">
                {restaurants.map((restaurant) => 
                <Restaurant key={restaurant.id} restaurant = {restaurant} /> )}
                </div>
            </div>
          </div>

          <div className="right-side-bar">
            <div className="google-map">
              <MapBuilder restaurants={restaurants}/>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default BusinessesPage;