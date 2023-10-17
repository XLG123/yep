import { createSelector } from "reselect";
import csrfFetch from "./csrf.js";

export const RECEIVE_USERS = "users/receiveUsers";

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
})

const getUsersData = state => state.users;

export const getUsers = createSelector(
  [getUsersData],
  (usersData) => {
    return Object.values(usersData);
  }
);

export const fetchUsers = () => async (dispatch) => {
  const response = await csrfFetch('/api/users');
  const data = await response.json();

  dispatch(receiveUsers(data));
}

const usersReducer = (state = {}, action) => {
  const newState = {...state};

  switch (action.type) {
    case RECEIVE_USERS:
      return { ...state, ...action.users.users};
    default:
      return newState;
  }
}

export default usersReducer;