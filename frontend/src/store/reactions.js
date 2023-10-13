import csrfFetch from "./csrf";

export const RECEIVE_REACTIONS = "reviews/receiveReactions";
export const RECEIVE_REACTION = "reactions/receiveReaction";
export const REMOVE_REACTION = "reactions/removeReaction";

export const receiveReactions = (reactions) => ({
  type: RECEIVE_REACTIONS,
  reactions
})

export const receiveReaction = (reaction) => ({
  type: RECEIVE_REACTION,
  reaction
})

export const removeReaction = (reactionId) => ({
  type: REMOVE_REACTION,
  reactionId
})

export const getReactions = (state) => {
  if (state.reactions) {
    return Object.values(state.reactions);
  } else {
    return [];
  }
}

export const getReaction = (reactionId) => (state) => {
  if (state.reactions && state.reactions[reactionId]) {
    return state.reactions[reactionId];
  } else {
    return null;
  }
}

export const fetchReactions = () => async (dispatch) => {
  const response = await csrfFetch('/api/reactions');
  const data = await response.json();

  dispatch(receiveReactions(data));
}

export const fetchReaction = (reactionId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reactions/${reactionId}`);
  const data = await response.json();
  
  dispatch(receiveReaction(data));
}

export const createReaction = (reaction) => async (dispatch) => {
  const response = await csrfFetch('/api/reactions/', {
    method: "POST",
    body: JSON.stringify(reaction)
  });

  if (response.ok) {
    const newReaction = await response.json();
    dispatch(receiveReaction(newReaction));
  }
  return response;
}

export const deleteReaction = (reactionId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reactions/${reactionId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    dispatch(removeReaction(reactionId));
    dispatch(fetchReactions());
  }
}

const reactionsReducer = (state = {}, action) => {
  const newState = {...state};

  switch (action.type) {
    case RECEIVE_REACTIONS:
      return { ...state, ...action.reactions.reactions};
    case RECEIVE_REACTION:
      return {...state, [action.reaction.id]: action.reaction}
    case REMOVE_REACTION:
      delete newState[action.reactionId];
      return newState;
    default:
      return newState;
  }
}

export default reactionsReducer;