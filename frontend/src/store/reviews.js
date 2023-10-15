import csrfFetch from "./csrf";

export const RECEIVE_REVIEWS = "reviews/receiveReviews";
export const RECEIVE_REVIEW = "reviews/receiveReview";
export const REMOVE_REVIEW = "reviews/removeReview";

export const receiveReviews = (reviews) => ({
  type: RECEIVE_REVIEWS,
  reviews
})

export const receiveReview = (review) => ({
  type: RECEIVE_REVIEW,
  review
})

export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId
})

export const getReviews = (state) => {
  if (state.reviews) {
    return Object.values(state.reviews);
  } else {
    return [];
  }
}

export const getReview = (reviewId) => (state) => {
  if (state.reviews && state.reviews[reviewId]) {
    return state.reviews[reviewId];
  } else {
    return null;
  }
}

export const fetchReviews = () => async (dispatch) => {
  const response = await csrfFetch('/api/reviews');
  const data = await response.json();

  dispatch(receiveReviews(data));
}

export const fetchReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`);
  const data = await response.json();
  
  dispatch(receiveReview(data));
}

export const createReview = (review) => async (dispatch) => {
  const response = await csrfFetch('/api/reviews/', {
    method: "POST",
    body: JSON.stringify(review)
  });

  if (response.ok) {
    const newReview = await response.json();
    dispatch(receiveReview(newReview));
  }
  return response;
}

export const updateReview = (review, reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(review)
  });

  if (response.ok) {
    const updatedReview = await response.json();
    dispatch(receiveReview(updatedReview));
  }
  return response;
}

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    dispatch(removeReview(reviewId));
    dispatch(fetchReviews());
  }
}

const reviewsReducer = (state = {}, action) => {
  const newState = { ...state };

  switch (action.type) {
    case RECEIVE_REVIEW:
      return {...state, [action.review.id]: action.review}
    case RECEIVE_REVIEWS:
      return { ...state, ...action.reviews.reviews};
    case REMOVE_REVIEW:
      delete newState[action.reviewId];
      return newState;
    default:
      return newState;
  }
};

export default reviewsReducer; 