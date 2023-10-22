import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurant,
  fetchRestaurants,
  getRestaurant,
  getRestaurants,
} from "../../store/restaurants";
import Rating from "@mui/material/Rating";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { fetchReviews, updateReview } from "../../store/reviews";
import Avatar from "@mui/material/Avatar";
import ReviewRating from "../BusinessesPage/ReviewRating";
import "./WriteReview.css";

const UpdateReview = () => {
  const location = useLocation();
  const location_path = location.pathname;
  let reviewId = location_path.split("/")[2];

  const reviews = useSelector((state) => state.reviews);
  let otherReviews = [];
  let currReview = "";

  if (reviews) {
    Object.values(reviews).forEach((review) => {
      if (review.id == reviewId) {
        currReview = review;
      }
    });

    Object.values(reviews).forEach((review) => {
      if (currReview.businessId === review.businessId) {
        otherReviews.push(review);
      }
    });
  }

  const restaurant = useSelector(getRestaurant(currReview.businessId));

  let currColor = "";
  if (currReview.rating === 1) {
    currColor = "#C3882E";
  } else if (currReview.rating === 2) {
    currColor = "#D5B53E";
  } else if (currReview.rating === 3) {
    currColor = "#E5A038";
  } else if (currReview.rating === 4) {
    currColor = "#EB6F3D";
  } else if (currReview.rating === 5) {
    currColor = "#D22E21";
  }

  const [rating, setRating] = useState(currReview.rating);
  const [hover, setHover] = useState(currReview.rating);
  const [color, setColor] = useState(currColor);
  const [reviewText, setReviewText] = useState(currReview.body);
  const [ratingError, setRatingError] = useState(false);
  const [reviewTextError, setReviewTextError] = useState(false);

  const ratingLabels = {
    1: "Not good",
    2: "Could've been better",
    3: "Ok",
    4: "Good",
    5: "Great",
  };

  const setNewColor = (newRating) => {
    if (newRating === 1) {
      setColor("#C3882E");
    } else if (newRating === 2) {
      setColor("#D5B53E");
    } else if (newRating === 3) {
      setColor("#E5A038");
    } else if (newRating === 4) {
      setColor("#EB6F3D");
    } else if (newRating === 5) {
      setColor("#D22E21");
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchReviews());
  }, [dispatch]);

  const submitReview = (e, rating, reviewText, originalRating, originalText) => {
    e.preventDefault();
    // console.log(rating);
    // console.log(reviewText);
    if (rating === undefined) {
      setRating(originalRating);
    }

    if (reviewText === "" || reviewText === undefined) {
      setReviewText(originalText);
    }

    if (rating === 0) {
      setRatingError(true);
    } else {
      setRatingError(false);
    }

    if (reviewText?.length < 85) {
      setReviewTextError(true);
    } else {
      setReviewTextError(false);
    }

    if (rating !== 0 && reviewText?.length >= 85) {
      const reviewObj = {
        rating: rating,
        body: reviewText,
        user_id: currReview.userId,
        reviewer_fn: currReview.reviewerFn,
        reviewer_ln: currReview.reviewerLn,
        business_id: currReview.businessId,
        helpful_count: currReview.helpfulCount,
        thanks_count: currReview.thanksCount,
        love_this_count: currReview.loveThisCount,
        oh_no_count: currReview.ohNoCount,
      };
      dispatch(updateReview(reviewObj, reviewId));
      dispatch(fetchReviews());
      navigate(`/restaurants/${currReview.businessId}`);
    }
  }

  const navigate = useNavigate();

  return (
    <>
      <div className="write-review-line-break"></div>
      <div className="review-pg-container">
        <div className="write-review-container">
          <div className="rp-restaurant-name">{restaurant?.name}</div>
          <div className="review-container">
            <div className="curr-rating">
              {currReview?.rating ? (
                <Rating
                  value={rating ? rating : currReview?.rating}
                  onChange={(e, newRating) => setRating(newRating)}
                  onChangeActive={(e, newHover) => {
                    setHover(newHover);
                    setNewColor(newHover);
                  }}
                  sx={{ fontSize: "1.8vw", color: color ? color : currColor }}
                />
              ) : null}

              <span className="rating-labels-container">
                {rating === 0 && hover === -1 ? "Select your rating" : null}
                {hover !== -1 ? ratingLabels[hover] : null}
                {hover === undefined && currReview?.rating
                  ? ratingLabels[currReview?.rating]
                  : null}
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
              defaultValue={currReview?.body}
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
            onClick={(e) => submitReview(e, rating, reviewText, currReview?.rating, currReview?.body)}
          >
            Update Review
          </div>
        </div>

        <div className="rest-recent-reviews-container">
          <div className="rest-recent-reviews-title">Recent Reviews</div>
          {otherReviews?.length === 0 ? (
            <div className="reviews-unscrollable-container">No reviews yet</div>
          ) : (
            <div className="reviews-scrollable-container">
              <ul>
                {otherReviews
                  ?.reverse()
                  .slice(0, 6)
                  .map((review) => (
                    <li
                      className="curr-rest-recent-review"
                      key={review.id + review.businessId}
                    >
                      <div className="review-user-profile">
                        <Avatar
                          sx={{
                            backgroundColor: "#555",
                            height: "2.5vw",
                            width: "2.5vw",
                            fontSize: "0.9vw",
                          }}
                        >
                          {review.reviewerFn[0]}
                          {review.reviewerLn[0]}
                        </Avatar>
                      </div>
                      <div className="reviewer">
                        <span>{review.reviewerFn}</span>
                        <span>{review.reviewerLn}</span>
                      </div>
                      <div className="recent-review-rating">
                        <ReviewRating
                          averageRating={review.rating}
                          ratingTime={
                            new Date(review.updatedAt)
                              .toLocaleString("en-US", {
                                timeZone: "America/New_York",
                              })
                              .split(",")[0]
                          }
                        />
                      </div>
                      <div className="recent-review-body">{review.body}</div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateReview;
