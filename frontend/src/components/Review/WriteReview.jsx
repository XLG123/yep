import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurant, getRestaurant } from "../../store/restaurants";
import Rating from "@mui/material/Rating";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./WriteReview.css";
import { createReview } from '../../store/reviews';

const WriteReview = () => {
  const location = useLocation();
  const location_path = location.pathname;
  let restaurantId = location_path.substring(13, 15);
  if (restaurantId[1] === "/") {
    restaurantId = restaurantId[0];
  }

  const currRestaurant = useSelector(getRestaurant(restaurantId));
  const currUser = useSelector((state) => state.session.user);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);
  const [reviewText, setReviewText] = useState("");
  const [ratingError, setRatingError] = useState(false);
  const [reviewTextError, setReviewTextError] = useState(false);

  const ratingLabels = {
    1: "Not good",
    2: "Could've been better",
    3: "Ok",
    4: "Good",
    5: "Great",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
  }, [restaurantId]);

  const submitReview = (e, rating, reviewText) => {
    if (rating === 0) {
      setRatingError(true);
    } else {
      setRatingError(false);
    }

    if (reviewText.length < 85) {
      setReviewTextError(true);
    } else {
      setReviewTextError(false);
    }

    if (ratingError === false && reviewTextError === false && rating !== 0 && reviewText.length >= 85) {
      const reviewObj = {
        rating: rating,
        body: reviewText,
        user_id: currUser.id,
        reviewer_fn: currUser.firstName,
        reviewer_ln: currUser.lastName,
        business_id: currRestaurant.id
      };
      dispatch(createReview(reviewObj));
    }
  };

  return (
    <>
      <div className="write-review-line-break"></div>

      <div className="review-pg-container">
        <div className="write-review-container">
          <div className="rp-restaurant-name">{currRestaurant?.name}</div>
          <div className="review-container">
            <div className="curr-rating">
              <Rating
                onChange={(e, newRating) => setRating(newRating)}
                onChangeActive={(e, newHover) => setHover(newHover)}
                sx={{ fontSize: "1.8vw" }}
              />
              <span className="rating-labels-container">
                {rating === 0 && hover === -1 ? "Select your rating" : null}
                {hover !== -1 ? ratingLabels[hover] : null}
                {rating !== 0 && hover === -1 ? ratingLabels[rating] : null}
              </span>
            </div>
            <div className="review-reminder-text">
              A few things to consider in your review
            </div>
            <div className="review-reminder-category-container">
              <span className="review-reminder-category">Food</span>
              <span className="review-reminder-category">Service</span>
              <span className="review-reminder-category">Ambiance</span>
            </div>
            <textarea
              className="review-text-area"
              placeholder="Enjoying the best time in our restaurant? Please leave us a review to help us improve for a better future experience!"
              onInput={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
          <div className="review-errors-container">
            {ratingError ? (
              <div className="review-error">
                <ErrorOutlineIcon
                  sx={{ marginRight: "0.3em", fontSize: "1.3vw" }}
                />
                No Rating, please rate the restaurant.
              </div>
            ) : null}
            {reviewTextError ? (
              <div className="review-error">
                <ErrorOutlineIcon
                  sx={{ marginRight: "0.3em", fontSize: "1.3vw" }}
                />
                Your review needs at least 85 characters. Add a few more
                thoughts to post review.
              </div>
            ) : null}
          </div>
          <div
            className="submit-review-btn"
            onClick={(e) => submitReview(e, rating, reviewText)}
          >
            Post Review
          </div>
        </div>

        <div className="rest-recent-reviews-container">
          <div className="rest-recent-reviews-title">Recent Reviews</div>
        </div>
      </div>
    </>
  );
};

export default WriteReview;
