import { useNavigate, useParams } from "react-router-dom";
import { fetchRestaurant, getRestaurant } from "../../store/restaurants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AverageRating from "./AverageRating";
import "./RestaurantShowPage.css";
import Loading from "../Loading/Loading";
import ShowPageMap from "../MapBuilder/ShowPageMap";
import PhoneIcon from "@mui/icons-material/Phone";
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import LaunchIcon from '@mui/icons-material/Launch';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const RestaurantShowPage = () => {
  const sessionUser = useSelector(state => state.session.user);

  const {restaurantId} = useParams();

  const restaurant = useSelector(getRestaurant(restaurantId));

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (sessionUser) {
      navigate(`/restaurants/${restaurantId}/writeareview`);
    } else {
      navigate("/login");
    }
  }

  const goToRestaurantActualPage = (e, url) => {
    // window.open(url, "_blank", "noreferrer");
  }

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
  }, [restaurantId]);

  return (
    <>
      {restaurant && (<div className="restaurant-sp-container">
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

        <div className="unscrollable-info">
          <div className="sp-title">{restaurant.name}</div>

          <div className="sp-avg-rating">
            {<AverageRating averageRating={restaurant.averageRating}/>}
          </div>

          <div className="sp-category-container">
            <span className="sp-price-range">
                &#9679; {restaurant.priceRange} &#9679; </span>
            <span>
            {restaurant.category.replace("_", " ")}

            </span>
          </div>
        </div>

        <div className="review-btn" onClick={handleClick}>
          Write a review
        </div>

        <div className="location-hours-container">
          <div className="loc-hr-title"><span>Location & Hours</span></div>
          <span className="sp-loc-container">

            <div className="sp-map-container">
              <ShowPageMap restaurant={restaurant}/>
            </div>

            <div className="sp-restaurant-addr">
              {restaurant.address}
            </div>

            <div className="sp-restaurant-loc-container">
              <span className="sp-restaurant-loc">{restaurant.city},</span>
              <span className="sp-restaurant-loc">{restaurant.state},</span>
              <span className="sp-restaurant-loc">{restaurant.zipCode}</span>
            </div>
          </span>

          <span className="sp-restaurant-hrs">

            <div className="day">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>

            <div className="open-hrs">
              <div>{restaurant.mon}</div>
              <div>{restaurant.tue}</div>
              <div>{restaurant.wed}</div>
              <div>{restaurant.thu}</div>
              <div>{restaurant.fri}</div>
              <div>{restaurant.sat}</div>
              <div>{restaurant.sun}</div>
            </div>
            
          </span>

        </div>


        <div className="sp-restaurant-info-box">
          {restaurant.phoneNumber ? 
            <div className="sp-restaurant-phone">
              <PhoneIcon />
              ({restaurant.phoneNumber.slice(0, 3)}) -   {restaurant.phoneNumber.slice(3, 6)} - {restaurant.phoneNumber.slice(6, 10)}
            </div> : 
            <div className="phone-num-notavailable">

              phone number is not available</div>}

            <div className="sp-line-divider"></div>

          {restaurant.webUrl ? 
            <div onClick={(e) => goToRestaurantActualPage(restaurant.webUrl)}>
              {restaurant.webUrl}
            </div> :
            null}

          <div className="sp-line-divider"></div>

          {restaurant.healthScore ? 
            <div><span className="sp-icon"><HealthAndSafetyIcon /></span>
          Health Score: {restaurant.healthScore}</div> : 
            <div><span className="sp-icon"><HealthAndSafetyIcon /></span>No 
            Health Scores are available</div>}

          <div className="sp-line-divider"></div>

          {restaurant.delivery ? <div>Offers Delivery</div> : 
            <div>Doesn't Offer Delivery</div>}

          <div className="sp-line-divider"></div>

          {restaurant.takeOut ? 
            <div><span className="sp-icon"><TakeoutDiningIcon /></span>Offers 
            Takeout</div> : 
            <div><span className="sp-icon"><TakeoutDiningIcon /></span>Doesn't 
            Offer Takeout</div>}

          <div className="sp-line-divider"></div>

          {restaurant.wifi ? 
            <div><span className="sp-icon"><WifiIcon /></span>
              Free Wi-Fi</div> :
            <div><span className="sp-icon"><WifiOffIcon /></span>
              NO Wi-Fi</div>}

          <div className="sp-line-divider"></div>

          {restaurant.reservation ? 
            <div><span className="sp-icon">
              <EditCalendarIcon /></span>Takes Reservations</div> : 
            <div><span className="sp-icon"><EditCalendarIcon /></span>Doesn't take reservations</div>}
        </div> 


      </div>)}
    
    </>
  );
}

export default RestaurantShowPage;