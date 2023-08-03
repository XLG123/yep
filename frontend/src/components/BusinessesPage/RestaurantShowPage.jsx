import { useLocation } from "react-router-dom";
import "./RestaurantShowPage.css";
import { fetchRestaurant, getRestaurant } from "../../store/restaurants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const RestaurantShowPage = () => {
  const restaurantId = useLocation().pathname.slice(13);

  const restaurant = useSelector(getRestaurant(restaurantId));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
  }, [])

  return (
    <>
    <div className="restaurant-sp-container">
      <div className="main-bg-scrollable-container">

        <div className="bg">
          <img src={restaurant.pictureUrls[0]} alt="restaurant" 
            className="bg-img"/>
        </div>

        <div className="bg">
          <img src={restaurant.pictureUrls[1]} alt="restaurant" 
            className="bg-img"/>
        </div>

        <div className="bg">
          <img src={restaurant.pictureUrls[2]} alt="restaurant" 
            className="bg-img"/>
        </div>

        <div className="bg">
          <img src={restaurant.pictureUrls[3]} alt="restaurant" 
            className="bg-img"/>
        </div>

        <div className="bg">
          <img src={restaurant.pictureUrls[4]} alt="restaurant" 
            className="bg-img"/>
        </div>

      </div>

      <div className="sp-title">{restaurant.name}</div>
      <div className="sp-category">{restaurant.category}</div>
    </div>
    </>
  );
}

export default RestaurantShowPage;