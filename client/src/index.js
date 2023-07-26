import "https://code.jquery.com/jquery-3.6.0.min.js";
import 'bootswatch/dist/lumen/bootstrap.css'; // styling for application is done with the help of lumen, a free package used with bootstrap
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'; 
import './index.css';
import App from './App';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
axios.defaults.xsrfCookieName = 'csrftoken'; 
axios.defaults.xsrfHeaderName = 'X-CSRFToken'; 

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
