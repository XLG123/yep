import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import configureStore from './store';
import { restoreSession } from './store/csrf';
import { createUser, loginUser, logoutUser } from './store/userReducer';

restoreSession().then(initializeApp)

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

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
