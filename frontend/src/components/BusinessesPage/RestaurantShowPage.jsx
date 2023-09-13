import { useNavigate, useParams } from "react-router-dom";
import { fetchRestaurant, getRestaurant } from "../../store/restaurants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AverageRating from "./AverageRating";
import "./RestaurantShowPage.css";
import Loading from "../Loading/Loading";
import ShowPageMap from "../MapBuilder/ShowPageMap";
import PhoneIcon from "@mui/icons-material/Phone";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import LaunchIcon from "@mui/icons-material/Launch";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

const RestaurantShowPage = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const { restaurantId } = useParams();

  const restaurant = useSelector(getRestaurant(restaurantId));

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (sessionUser) {
      navigate(`/restaurants/${restaurantId}/writeareview`);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
  }, [restaurantId]);

  return (
    <>
      {restaurant && (
        <div className="restaurant-sp-container">
          <div className="main-bg-scrollable-container">
            <div className="bg">
              <img
                src={restaurant.pictureUrls[0]}
                alt="restaurant"
                className="bg-img"
              />
            </div>

            <div className="bg">
              <img
                src={restaurant.pictureUrls[1]}
                alt="restaurant"
                className="bg-img"
              />
            </div>

            <div className="bg">
              <img
                src={restaurant.pictureUrls[2]}
                alt="restaurant"
                className="bg-img"
              />
            </div>

            <div className="bg">
              <img
                src={restaurant.pictureUrls[3]}
                alt="restaurant"
                className="bg-img"
              />
            </div>

            <div className="bg">
              <img
                src={restaurant.pictureUrls[4]}
                alt="restaurant"
                className="bg-img"
              />
            </div>
          </div>

          <div className="unscrollable-info">
            <div className="sp-title">{restaurant.name}</div>

            <div className="sp-avg-rating">
              {<AverageRating averageRating={restaurant.averageRating} />}
            </div>

            <div className="sp-category-container">
              <span className="sp-price-range">
                &#9679; {restaurant.priceRange} &#9679;{" "}
              </span>
              <span>{restaurant.category.replace("_", " ")}</span>
            </div>
          </div>

          <div className="review-btn" onClick={handleClick}>
            Write a review
          </div>

          <div className="sp-rest-basic-info-container">
            <div className="location-hours-container">
              <div className="loc-hr-title">
                <span>Location & Hours</span>
              </div>
              <span className="sp-loc-container">
                <div className="sp-map-container">
                  <ShowPageMap restaurant={restaurant} />
                </div>

                <div className="sp-restaurant-addr">{restaurant.address}</div>

                <div className="sp-restaurant-loc-container">
                  <span className="sp-restaurant-loc">{restaurant.city},</span>
                  <span className="sp-restaurant-loc">{restaurant.state},</span>
                  <span className="sp-restaurant-loc">
                    {restaurant.zipCode}
                  </span>
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
                  <div>
                    {restaurant.mon}
                    {restaurant.monOptional ? (
                      <span>&nbsp;&nbsp;&nbsp;</span>
                    ) : null}
                    {restaurant.monOptional}
                  </div>

                  <div>
                    {restaurant.tue}
                    {restaurant.tueOptional ? (
                      <span>&nbsp;&nbsp;&nbsp;</span>
                    ) : null}
                    {restaurant.tueOptional}
                  </div>

                  <div>
                    {restaurant.wed}
                    {restaurant.wedOptional ? (
                      <span>&nbsp;&nbsp;&nbsp;</span>
                    ) : null}
                    {restaurant.wedOptional}
                  </div>

                  <div>
                    {restaurant.thu}
                    {restaurant.thuOptional ? (
                      <span>&nbsp;&nbsp;&nbsp;</span>
                    ) : null}
                    {restaurant.thuOptional}
                  </div>

                  <div>
                    {restaurant.fri}
                    {restaurant.friOptional ? (
                      <span>&nbsp;&nbsp;&nbsp;</span>
                    ) : null}
                    {restaurant.friOptional}
                  </div>

                  <div>
                    {restaurant.sat}
                    {restaurant.satOptional ? (
                      <span>&nbsp;&nbsp;&nbsp;</span>
                    ) : null}
                    {restaurant.satOptional}
                  </div>

                  <div>
                    {restaurant.sun}
                    {restaurant.sunOptional ? (
                      <span>&nbsp;&nbsp;&nbsp;</span>
                    ) : null}
                    {restaurant.sunOptional}
                  </div>
                </div>
              </span>
            </div>

            <div
              className="sp-restaurant-info-box"
              style={{ color: "#2D2E2F" }}
            >
              {restaurant.phoneNumber ? (
                <div className="sp-restaurant-phone sp-rest-info-box">
                  <span className="sp-icon-container">
                    <PhoneIcon className="sp-icon" />
                  </span>
                  ({restaurant.phoneNumber.slice(0, 3)}) -{" "}
                  {restaurant.phoneNumber.slice(3, 6)} -{" "}
                  {restaurant.phoneNumber.slice(6, 10)}
                </div>
              ) : (
                <div className="phone-num-notavailable">
                  <span className="sp-icon-container">
                    <PhoneIcon className="sp-icon" />
                  </span>
                  phone number is not available
                </div>
              )}

              <div className="sp-line-divider"></div>

              {restaurant.webUrl !== "N/A" ? (
                <a
                  href={restaurant.webUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="sp-rest-link sp-rest-info-box"
                >
                  <span className="sp-icon-container">
                    <LaunchIcon className="sp-icon" />
                  </span>
                  <span className="rest-url">{restaurant.webUrl}</span>
                </a>
              ) : (
                <div className="sp-rest-info-box">
                  <span className="sp-icon-container">
                    <LaunchIcon className="sp-icon" />
                  </span>
                  NO Restaurant Link
                </div>
              )}

              <div className="sp-line-divider"></div>

              {restaurant.wifi ? (
                <div className="sp-rest-info-box">
                  <span className="sp-icon-container">
                    <WifiIcon className="sp-icon" />
                  </span>
                  Free Wi-Fi
                </div>
              ) : (
                <div className="sp-rest-info-box">
                  <span className="sp-icon-container">
                    <WifiOffIcon className="sp-icon" />
                  </span>
                  NO Wi-Fi
                </div>
              )}

              <div className="sp-line-divider"></div>

              {restaurant.healthScore ? (
                <div className="sp-rest-info-box">
                  <span className="sp-icon-container">
                    <HealthAndSafetyIcon className="sp-icon" />
                  </span>
                  Health Score: {restaurant.healthScore}
                </div>
              ) : (
                <div className="sp-rest-info-box">
                  <span className="sp-icon-container">
                    <HealthAndSafetyIcon className="sp-icon" />
                  </span>
                  NO Health Scores
                </div>
              )}

              <div className="sp-line-divider"></div>

              {restaurant.delivery ? (
                <div className="sp-rest-info-box">
                  <span className="sp-icon-container">
                    <LocalShippingIcon className="sp-icon" />
                  </span>
                  Offers Delivery
                </div>
              ) : (
                <div className="sp-rest-info-box">
                  <span className="sp-icon-container">
                    <LocalShippingIcon className="sp-icon" />
                  </span>
                  Doesn't Offer Delivery
                </div>
              )}

              <div className="sp-line-divider"></div>

              {restaurant.takeOut ? (
                <div className="sp-rest-info-box">
                  <span className="sp-icon-container">
                    <TakeoutDiningIcon className="sp-icon" />
                  </span>
                  Offers Takeout
                </div>
              ) : (
                <div className="sp-rest-info-box">
                  <span className="sp-icon-container">
                    <TakeoutDiningIcon className="sp-icon" />
                  </span>
                  <span className="sp-rest-info-text">
                    Doesn't Offer Takeout
                  </span>
                </div>
              )}

              <div className="sp-line-divider"></div>

              {restaurant.reservation ? (
                <div className="sp-rest-info-box">
                  <span className="sp-icon-container">
                    <EditCalendarIcon className="sp-icon" />
                  </span>
                  Takes Reservations
                </div>
              ) : (
                <div className="sp-rest-info-box">
                  <span className="sp-icon-container">
                    <EditCalendarIcon className="sp-icon" />
                  </span>
                  Does Not take reservations
                </div>
              )}
            </div>
          </div>

          <div className="sp-rest-reviews-container">123 reviews</div>
        </div>
      )}
    </>
  );
};

export default RestaurantShowPage;
