import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
import { restoreSession } from './store/csrf';
import { createUser, loginUser, logoutUser } from './store/usersReducer';
import configureStore from './store';


// function Root() {
//   return (
//     // <Provider>
//       <BrowserRouter>
//         <App/>
//       </BrowserRouter>
//     // </Provider>
//   );
// }

window.createUser = createUser
window.loginUser = loginUser
window.logoutUser = logoutUser

const root = ReactDOM.createRoot(document.getElementById('root'));
const initializeApp = () => {
  let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  let initialState = {};

  if (currentUser) {
    initialState = {
      users: {
        [currentUser.id]: currentUser
      }
    };
  };

  const store = configureStore(initialState);
  // window.store = store;

  root.render(
    <React.StrictMode>
      <Provider store = {store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

restoreSession().then(initializeApp)
