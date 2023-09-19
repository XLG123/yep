import React, { useEffect } from "react";
import "./Activity.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../store/reviews";
import { fetchRestaurants, getRestaurants } from "../../store/restaurants";
import Avatar from "@mui/material/Avatar";
import ReviewRating from "../BusinessesPage/ReviewRating";
import { NavLink } from "react-router-dom";

const Activity = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchReviews());
  }, [dispatch]);

  const restaurants = useSelector(getRestaurants);
  const reviews = useSelector((state) => state.reviews.reviews);
  let recentReviews = [];
  let reviewRestaurantIds = [];
  let selectedRestaurants = [];

  if (reviews) {
    Object.values(reviews).forEach((review) => {
      recentReviews.push(review);
    });

    recentReviews = recentReviews.reverse().slice(0, 6);

    recentReviews.forEach((recentReview) => {
      reviewRestaurantIds.push(recentReview.businessId);
    });

    restaurants.forEach((restaurant) => {
      if (reviewRestaurantIds.includes(restaurant.id)) {
        selectedRestaurants.push(restaurant);
      }
    });
  }

  return (
    <>
      <div className="activity-container">
        <h2 className="activity-container-title">Recent Acitivty</h2>
        <div className="activity-reviews-container">
          <ul className="activity-reviews">
            {recentReviews?.map((review) => (
              <li
                className="activity-recent-review"
                key={review.id + review.businessId}
              >
                <NavLink
                  to={`/restaurants/${review.businessId}`}
                  className="activity-pg-go-to-rest-container"
                >
                  <div className="review-restaurant-name">
                    {
                      selectedRestaurants.find(
                        (restaurant) => restaurant.id === review.businessId
                      ).name
                    }
                  </div>
                  <div className="review-rest-pic-container">
                    <img
                      src={
                        selectedRestaurants.find(
                          (restaurant) => restaurant.id === review.businessId
                        ).pictureUrls[0]
                      }
                      alt="img"
                      className="review-rest-pic"
                    />
                  </div>

                  <div className="recent-review-profile">
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
                  <div className="recent-review-reviewer">
                    <span>{review.reviewerFn}</span>
                    <span>{review.reviewerLn}</span>
                  </div>
                  <div className="activity-recent-review-rating">
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
                  <div className="recent-activity-review-body">
                    {review.body}
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Activity;
