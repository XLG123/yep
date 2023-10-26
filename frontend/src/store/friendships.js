import { createSelector } from "reselect";
import csrfFetch from "./csrf";

export const RECEIVE_FRIENDSHIPS = "friendships/receiveFriendships";
export const RECEIVE_FRIENDSHIP = "friendships/receiveFriendship";
export const REMOVE_FRIENDSHIP = "friendships/removeFriendship";

export const receiveFriendships = (friendships) => ({
  type: RECEIVE_FRIENDSHIPS,
  friendships
})

export const receiveFriendship = (friendship) => ({
  type: RECEIVE_FRIENDSHIP,
  friendship
})

export const removeFriendship = (friendshipId) => ({
  type: REMOVE_FRIENDSHIP,
  friendshipId
})

const getFriendshipsData = state => state.friendships;

export const getFriendships = createSelector(
  [getFriendshipsData],
  (friendshipsData) => {
    return Object.values(friendshipsData);
  }
);

export const fetchFriendships = () => async (dispatch) => {
  const response = await csrfFetch('/api/friendships');
  const data = await response.json();

  dispatch(receiveFriendships(data));
}

export const createFriendship = (friendship) => async (dispatch) => { 
  const response = await csrfFetch('/api/friendships/', {
    method: "POST",
    body: JSON.stringify(friendship)
  });

  if (response.ok) {
    const newFriendship = await response.json();
    dispatch(receiveFriendship(newFriendship));
  }
  return response;
}

export const deleteFriendship = (friendshipId) => async (dispatch) => {
  const response = await csrfFetch(`/api/friendships/${friendshipId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    dispatch(removeFriendship(friendshipId));
  }
}

const friendshipsReducer = (state = {}, action) => {
  const newState = {...state};

  switch (action.type) {
    case RECEIVE_FRIENDSHIPS:
      return {...state, ...action.friendships.friendships};
    case RECEIVE_FRIENDSHIP:
      return {...state, [action.friendship.id]: action.friendship}
    case REMOVE_FRIENDSHIP:
      delete newState[action.friendshipId];
      return newState;
    default:
      return newState;
  }
}

export default friendshipsReducer;