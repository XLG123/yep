import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AssociatedReactions from "./AssociatedReactions";
import "./ReviewsList.css";
import { deleteReview, fetchReviews, updateReview } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/users";

const ReviewsList = ({ reviews, isCurrUser, currUserId }) => {
  // console.log(reviews);
  // console.log(isCurrUser);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openElement, setOpenElement] = useState(null);
  const [modalEleId, setModalEleId] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editReviewObj, setEditReviewObj] = useState(null);

  let currColor = "";
  if (editReviewObj?.rating === 1) {
    currColor = "#C3882E";
  } else if (editReviewObj?.rating === 2) {
    currColor = "#D5B53E";
  } else if (editReviewObj?.rating === 3) {
    currColor = "#E5A038";
  } else if (editReviewObj?.rating === 4) {
    currColor = "#EB6F3D";
  } else if (editReviewObj?.rating === 5) {
    currColor = "#D22E21";
  }

  const [rating, setRating] = useState(
    editReviewObj?.rating ? editReviewObj?.rating : null
  );
  const [hover, setHover] = useState(
    editReviewObj?.rating ? editReviewObj?.rating : -1
  );
  const [color, setColor] = useState(currColor);
  const [reviewBody, setReviewBody] = useState(
    editReviewObj?.body ? editReviewObj?.body : null
  );
  const [reviewBodyError, setReviewBodyError] = useState(false);

  // console.log(rating);
  // console.log(hover);
  // console.log(color);
  // console.log(reviewBody);

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

  const handleAnchorClick = (e, currReview) => {
    setAnchorEl(e.currentTarget);
    setOpenElement(currReview);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenElement(null);
  };

  const handleOpenModal = (reviewId) => {
    setOpenModal(true);
    setModalEleId(reviewId);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalEleId(null);
  };

  const handleEditModal = (review) => {
    setOpenEditModal(true);
    setEditReviewObj(review);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
    setEditReviewObj(null);
    setRating(null);
    setHover(-1);
    setColor(currColor);
    // console.log(color);
    setReviewBody(null);
    setReviewBodyError(false);
  };

  const showModal = (e, reviewId) => {
    handleClose();
    handleOpenModal(reviewId);
  };

  const showEditModal = (e, review) => {
    handleClose();
    handleEditModal(review);
  };

  const dispatch = useDispatch();

  const handleRemove = (e, reviewId) => {
    e.preventDefault();
    handleCloseModal();
    dispatch(deleteReview(reviewId));
  };

  const navigate = useNavigate();

  const goToRestaurantPage = (e, restaurantId) => {
    e.preventDefault();
    navigate(`/restaurants/${restaurantId}`);
  };

  const submitUpdatedReview = (e) => {
    if (reviewBody?.length < 85) {
      setReviewBodyError(true);
    } else if (reviewBody?.length >= 85 || editReviewObj?.body.length >= 85) {
      setReviewBodyError(false);
      const newReviewObj = {
        rating: rating ? rating : editReviewObj?.rating,
        body: reviewBody ? reviewBody : editReviewObj?.body,
        user_id: currUserId,
        reviewer_fn: editReviewObj?.reviewerFn,
        reviewer_ln: editReviewObj?.reviewerLn,
        businessId: editReviewObj?.restaurantId,
        helpful_count: editReviewObj?.helpfulCount,
        thanks_count: editReviewObj?.thanksCount,
        love_this_count: editReviewObj?.loveThisCount,
        oh_no_count: editReviewObj?.ohNoCount,
      };
      dispatch(updateReview(newReviewObj, editReviewObj?.id));
      dispatch(fetchUsers());
      closeEditModal();
    }
  }

  const myBoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    borderColor: "rgba(235,235,235,1)",
    borderRadius: "5px",
    boxShadow: 50,
    padding: "2.8vw",
  };

  const currUserAllReviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [Object.values(currUserAllReviews)?.length]);

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

                  {isCurrUser && (
                    <div className="pg-more-options-btn">
                      <IconButton
                        id="simple-button"
                        aria-controls={open ? "basic-menu" : null}
                        aria-expanded={open ? "true" : null}
                        aria-haspopup="true"
                        aria-label="Click to show more options"
                        title="More options"
                        onClick={(e) => handleAnchorClick(e, review)}
                        sx={{
                          fontSize: "1.8vw",
                          position: "relative",
                          left: "1.5vw",
                          "&:hover": { backgroundColor: "#E2E2E6" },
                        }}
                      >
                        <MoreHorizIcon
                          sx={{ fontSize: "1.8vw", color: "#2D2E2F" }}
                        />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "simple-button",
                          sx: { py: "0.5vw", px: "0.5vw" },
                        }}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        sx={{ lineHeight: "1vw", borderRadius: "4px" }}
                        elevation={1}
                      >
                        <MenuItem
                          onClick={(e) => showEditModal(e, openElement)}
                          sx={{
                            fontSize: "1vw",
                            fontWeight: "600",
                            minHeight: "fit-content",
                            paddingLeft: "1vw",
                            paddingRight: "1vw",
                            borderRadius: "4px",
                            "&:hover": { backgroundColor: "#E2E2E6" },
                          }}
                        >
                          Update Review
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => showModal(e, openElement?.id)}
                          sx={{
                            fontSize: "1vw",
                            fontWeight: "600",
                            minHeight: "fit-content",
                            paddingLeft: "1vw",
                            paddingRight: "1vw",
                            borderRadius: "4px",
                            "&:hover": { backgroundColor: "#E2E2E6" },
                          }}
                        >
                          Remove Review
                        </MenuItem>
                      </Menu>
                      <Modal
                        open={openEditModal}
                        onClose={closeEditModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{
                          "& .MuiBackdrop-root": {
                            backgroundColor: "transparent",
                            backdropFilter: "brightness(80%)",
                          },
                        }}
                      >
                        <Box sx={myBoxStyle}>
                          <div className="modal-restaurant-name">
                            {editReviewObj?.restaurantName}
                          </div>

                          <div className="modal-restaurant-review-container">
                            <div className="modal-rating-container">
                              <span className="modal-rating">
                                <Rating
                                  value={
                                    rating ? rating : editReviewObj?.rating
                                  }
                                  onChange={(e, newRating) =>
                                    setRating(newRating)
                                  }
                                  onChangeActive={(e, newHover) => {
                                    setHover(newHover);
                                    setNewColor(newHover);
                                  }}
                                  sx={{
                                    fontSize: "1.8vw",
                                    color: color ? color : currColor,
                                  }}
                                />
                              </span>
                              <span className="modal-rating-text">
                                {rating && hover === -1
                                  ? ratingLabels[rating]
                                  : hover !== -1
                                  ? ratingLabels[hover]
                                  : editReviewObj?.rating
                                  ? ratingLabels[editReviewObj?.rating]
                                  : null}
                              </span>
                            </div>

                            <div className="modal-reminder-text">
                              A few things to consider in your review
                            </div>
                            <div className="modal-reminder-categories">
                              <span>Food</span>
                              <span>Service</span>
                              <span>Ambiance</span>
                            </div>
                            <div className="modal-review-input">
                              <textarea
                                defaultValue={editReviewObj?.body}
                                className="review-text-area modal-text-area"
                                placeholder="Enjoying the best time in our restaurant? Please leave us a review to help us improve for a better future experience!"
                                onInput={(e) => setReviewBody(e.target.value)}
                              ></textarea>
                            </div>
                          </div>

                          {reviewBodyError && (
                            <div className="modal-review-errors">
                              <ErrorOutlineIcon
                                sx={{ marginRight: "0.3em", fontSize: "1.3vw" }}
                              />
                              Your review needs at least 85 characters. Add a
                              few more thoughts to update review.
                            </div>
                          )}

                          <div
                            className="modal-submit-update-btn"
                            onClick={(e) => submitUpdatedReview(e)}
                          >
                            Update Review
                          </div>
                        </Box>
                      </Modal>
                      <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{
                          "& .MuiBackdrop-root": {
                            backgroundColor: "transparent",
                            backdropFilter: "brightness(80%)",
                          },
                        }}
                      >
                        <Box className="modal-content" sx={myBoxStyle}>
                          <div className="modal-title">Remove Review</div>
                          <div className="modal-text">
                            Are you sure you want to remove this review? It can
                            help the restaurants improve their services the more
                            reviews they get.
                          </div>
                          <div className="modal-btn-gp">
                            <div
                              className="modal-btn"
                              onClick={handleCloseModal}
                            >
                              Keep Review
                            </div>
                            <div
                              className="modal-btn"
                              onClick={(e) => handleRemove(e, modalEleId)}
                            >
                              Confirm Remove
                            </div>
                          </div>
                        </Box>
                      </Modal>
                    </div>
                  )}
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
