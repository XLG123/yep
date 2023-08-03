import csrfFetch from "./csrf";
import { createSelector } from "reselect";

export const RECEIVE_RESTAURANTS = "businesses/RECEIVE_RESTAURANTS";
export const RECEIVE_RESTAURANT = "businesses/RECEIVE_RESTAURANT";

const getRestaurantsData = state => state.restaurants;

export const getRestaurants = createSelector(
  [getRestaurantsData],
  (restaurantsData) => {
    return Object.values(restaurantsData);
    // return restaurantsData.filter();
  }
);

export const getRestaurant = (restaurantId) => (state) => {
  if (state && state.restaurants) {
    return state.restaurants[restaurantId];
  } else {
    return null;
  }
}

// export const getRestaurants = (state) => {
//   if (!state.restaurants) {
//     return [];
//   } else {
//     return Object.values(state.restaurants);
//   }
// }

export const fetchRestaurants = () => async (dispatch) => {
  const response = await csrfFetch('/api/restaurants');
  const data = await response.json();

  dispatch({
    type: RECEIVE_RESTAURANTS,
    restaurants: data.restaurants,
  });
}

export const fetchRestaurantsWithQuery = (query) => async (dispatch) => {
  const response = await csrfFetch(`/api/businesses/search${query}`);
  const data = await response.json();

  dispatch({
    type: RECEIVE_RESTAURANTS,
    restaurants: data.restaurants,
  })
  console.log(data);
}

export const fetchRestaurant = (restaurantId) => async (dispatch) => {
  const response = await csrfFetch(`/api/restaurants/${restaurantId}`);
  const data = await response.json();

  dispatch({
    type: RECEIVE_RESTAURANT,
    restaurant: data,
  })
}

const restaurantReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_RESTAURANTS:
      return {...action.restaurants};
    case RECEIVE_RESTAURANT:
      return {...state, [action.restaurant.id]: action.restaurant};
    default:
      return state;
  }
}

export default restaurantReducer;