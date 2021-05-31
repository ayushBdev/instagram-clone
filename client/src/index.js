import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./component/#Redux/Store";

ReactDOM.render(
  <BrowserRouter>
        <Provider store={Store}>
            <App />
        </Provider>
    </BrowserRouter>,
document.getElementById('root')
);