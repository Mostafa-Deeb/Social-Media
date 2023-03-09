import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { postReducer } from "./reducers/posts";
import { authReducer } from "./reducers/auth";
import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
const reducer = combineReducers({ postReducer, authReducer });
const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(reducer, compose(applyMiddleware(thunk)));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />{" "}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
