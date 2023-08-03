import React from "react";
import "./Restaurant.css";
import AverageRating from "./AverageRating";
import { NavLink } from "react-router-dom";

const Restaurant = ({restaurant, index}) => {

  const categories = restaurant.category.split('_');

  return (
    <>
      <NavLink to={`/restaurants/${restaurant.id}`}
        className="restaurant-link">
        <div className="restaurant-container">

          <span className="restaurant-img">
            {/* <img src="https://img-16.stickers.cloud/packs/fcdf27ab-ba83-432f-a5fe-46e0c7f99df3/webp/adac529c-5360-4ebf-8554-13439160ecd4.webp" alt="restaurant"/> */}
            <img src={restaurant.pictureUrls[0]} alt="img"/>
          </span>

          <span className="restaurant-info">

            <div className="restaurant-name">{index+1}. {restaurant.name}</div>

            <div className="bp-average-rating">
              <AverageRating averageRating = {restaurant.averageRating}/>
            </div>

            <div className="restaurant-details">
              <div className="restaurant-bg-details">
                {categories.map((category) => 
                <span key={category} className="restaurant-category">{category}
                </span>)}
                <span className="restaurant-price-range">{restaurant.priceRange}</span>
              </div>

              <div className="restaurant-location">
                <span className="city">{restaurant.city}, </span>
                <span className="state">{restaurant.state}, </span>
                <span className="zip-code">{restaurant.zipCode}</span>
              </div>

              <div className="restaurant-phone-number">
                ({restaurant.phoneNumber.slice(0, 3)}) -   {restaurant.phoneNumber.slice(3, 6)} - {restaurant.phoneNumber.slice(6, 10)}
              </div>
            </div>


          </span>

        </div>
      </NavLink>
    </>
  );
}

export default Restaurant;