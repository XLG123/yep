// import csrfFetch from "./csrf";
import { createSelector } from "reselect";

export const RECEIVE_RESTAURANTS = "businesses/RECEIVE_RESTAURANTS";

const getRestaurantsData = state => state.restaurants;

export const getRestaurants = createSelector(
  [getRestaurantsData],
  (restaurantsData) => {
    return Object.values(restaurantsData);
    // return restaurantsData.filter();
  }
);

// export const getRestaurants = (state) => {
//   if (!state.restaurants) {
//     return [];
//   } else {
//     return Object.values(state.restaurants);
//   }
// }

export const fetchRestaurants = () => async (dispatch) => {
  const response = await fetch('/api/restaurants');
  const data = await response.json();

  dispatch({
    type: RECEIVE_RESTAURANTS,
    restaurants: data.restaurants,
  });
}

const restaurantReducer = (state = {}, action) => {
  let newState = {...state};

  switch(action.type) {
    case RECEIVE_RESTAURANTS:
      return {...state, ...action.restaurants};
    default:
      return state;
  }
}

export default restaurantReducer;