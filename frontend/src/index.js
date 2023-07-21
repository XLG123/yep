import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

function Root() {
  return (
    // <Provider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    // </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
