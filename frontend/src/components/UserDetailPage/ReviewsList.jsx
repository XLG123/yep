import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AssociatedReactions from "./AssociatedReactions";
import "./ReviewsList.css";

const ReviewsList = ({ reviews, isCurrUser, currUserId }) => {
  // console.log(reviews);
  // console.log(isCurrUser);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openModal, setOpenModal] = useState(false);

  const handleAnchorClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleOpenModal = () => {
  //   setOpenModal(true);
  // };

  const navigate = useNavigate();

  const goToRestaurantPage = (e, restaurantId) => {
    e.preventDefault();
    navigate(`/restaurants/${restaurantId}`);
  };

  return (
    <>
      <div className="reviews-list-title">Reviews</div>
      {reviews !== undefined ? (
        <ul className="reviews-list-container">
          {Object.values(reviews)
            ?.reverse()
            .map((review) => (
              <li className="reviewed-restaurant" key={review.id}>
                <div className="restaurant-basic-info">
                  <div className="restaurant-thumbnail">
                    <img
                      src={review.restaurantPictures[0]}
                      alt="thumbnail"
                      onClick={(e) =>
                        goToRestaurantPage(e, review?.restaurantId)
                      }
                    />
                  </div>
                  <div className="text-container">
                    {/* Restaurant name */}
                    <div
                      className="reviewed-restaurant-name"
                      onClick={(e) =>
                        goToRestaurantPage(e, review?.restaurantId)
                      }
                    >
                      {review?.restaurantName}
                    </div>

                    {/* Restaurant category */}
                    <div className="reviewed-restaurant-category">
                      {review?.restaurantCategory.replaceAll("_", ", ")}
                    </div>

                    {/* Restaurant address */}
                    <div className="reviewed-restaurant-address">
                      <span className="reviewed-restaurant-city">
                        {review?.restaurantCity},
                      </span>
                      <span className="reviewed-restaurant-state">
                        {review?.restaurantState},
                      </span>
                      <span className="reviewed-restaurant-zipcode">
                        {review?.restaurantZipCode}
                      </span>
                    </div>
                  </div>

                  {isCurrUser && <div className="pg-more-options-btn">
                    <IconButton>
                      <MoreHorizIcon sx={{ fontSize: "1.8vw", color: "#2D2E2F"}}/>
                    </IconButton>
                  </div>}
                </div>

                <div className="associated-review">
                  <div className="rating-time-container">
                    <div className="associated-review-rating">
                      <Rating
                        value={review?.rating}
                        readOnly
                        sx={{
                          color:
                            review?.rating === 1
                              ? "#C3882E"
                              : review?.rating === 2
                              ? "#D5B53E"
                              : review?.rating === 3
                              ? "#E5A038"
                              : review?.rating === 4
                              ? "#EB6F3D"
                              : "#D22E21",
                          fontSize: "1.8vw",
                        }}
                      />
                    </div>
                    <div className="associated-review-time">
                      {new Date(review?.createdAt).toLocaleString("en-US", {
                        timeZone: "America/New_York",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="associated-review-body">{review?.body}</div>
                  <AssociatedReactions
                    associatedReactions={review?.reactions}
                    helpfulCount={review?.helpfulCount}
                    thanksCount={review?.thanksCount}
                    loveThisCount={review?.loveThisCount}
                    ohNoCount={review?.ohNoCount}
                    currUserId={currUserId}
                    reviewerId={review?.userId}
                    reviewId={review?.id}
                  />
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <div className="empty-reviewed-restaurants-list">
          {isCurrUser
            ? "Leave a review on your favorite restaurant."
            : "This user hasn't left any reviews yet."}
        </div>
      )}
    </>
  );
};

export default ReviewsList;
