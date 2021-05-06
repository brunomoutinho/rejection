import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { reducer } from "./store/index.js";
import { getSavedState, saveState } from "./storage/index.js";
import throttle from "lodash/throttle";

const savedState = getSavedState();
const store = createStore(reducer, savedState);
store.subscribe(throttle(() => saveState(store.getState()), 1000));

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
