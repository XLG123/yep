import { useLocation } from "react-router-dom";
import "./WriteReview.css";
import { useSelector } from "react-redux";
import { getRestaurants } from "../../store/restaurants";
import Rating from "@mui/material/Rating";
import { useState } from "react";

const WriteReview = () => {
  const location = useLocation();
  const location_path = location.pathname;
  let restaurantId = location_path.substring(13, 15);
  if (restaurantId[1] === "/") {
    restaurantId = restaurantId[0];
  }

  const allRestaurants = useSelector(getRestaurants);
  const currRestaurant = allRestaurants.filter(
    (restaurant) => restaurant.id == restaurantId
  )[0];

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);

  const ratingLabels = {
    1: "Not good",
    2: "Could've been better",
    3: "Ok",
    4: "Good",
    5: "Great",
  };

  // const getLabelText = (rating) => {
  //   return `${rating} Star${rating !== 1 ? 's' : ''}, ${ratingLabels[rating]}`;
  // }

  return (
    <>
      <div className="write-review-line-break"></div>

      <div className="review-pg-container">
        <div className="write-review-container">
          <div className="rp-restaurant-name">{currRestaurant?.name}</div>
          <div className="review-container">
            <div className="curr-rating">
              <Rating
                // getLabelText={getLabelText}
                onChange={(e, newRating) => setRating(newRating)}
                onChangeActive={(e, newHover) => setHover(newHover)}
                sx={{ fontSize: "1.8vw" }}
              />
              <span className="rating-labels-container">
                {rating === 0 && hover === -1 ? "Select your rating" : null}
                {hover !== -1 ? ratingLabels[hover] : null}
                {rating !== 0 && hover === -1 ? ratingLabels[rating] : null}
                {console.log(rating)}
              </span>
            </div>
          </div>
          <div className="submit-review-btn">Post Review</div>
        </div>

        <div className="rest-recent-reviews-container">
          <div className="rest-recent-reviews-title">Recent Reviews</div>
        </div>
      </div>
    </>
  );
};

export default WriteReview;
