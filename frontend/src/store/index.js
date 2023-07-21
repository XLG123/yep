import userReducer from "./usersReducer";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  user: userReducer
});

const logger = require("redux-logger").default;
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, logger));

const configureStore = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;