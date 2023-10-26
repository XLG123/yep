import { createSelector } from "reselect";
import csrfFetch from "./csrf.js";

export const RECEIVE_USERS = "users/receiveUsers";
export const RECEIVE_USER = "users/receiveUser";

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
})

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
})

const getUsersData = state => state.users;

export const getUsers = createSelector(
  [getUsersData],
  (usersData) => {
    return Object.values(usersData);
  }
);

export const getUser = (userId) => (state) => {
  if (state.users && state.users[userId]) {
    return state.users[userId];
  } else {
    return null;
  }
}

export const fetchUsers = () => async (dispatch) => {
  const response = await csrfFetch('/api/users');
  const data = await response.json();

  dispatch(receiveUsers(data));
}

export const fetchUser = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}`);
  const data = await response.json();

  dispatch(receiveUser(data));
}

const usersReducer = (state = {}, action) => {
  const newState = {...state};

  switch (action.type) {
    case RECEIVE_USERS:
      return { ...state, ...action.users.users};
    case RECEIVE_USER:
      return {...state, currentUser: action.user.user};
    default:
      return newState;
  }
}

export default usersReducer;