import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { Provider } from "react-redux";

//initialize redux state with values in localStorage, so they persist if the page is refreshed
const loadInitialState = () => {
  try {
    return {
      title: JSON.parse(localStorage.getItem("title") || '""'),
      author: JSON.parse(localStorage.getItem("author") || '""'),
      character: JSON.parse(localStorage.getItem("character") || '""'),
      spotifyUser: JSON.parse(localStorage.getItem("spotifyUser") || "{}"),
      playlistTracks: JSON.parse(
        localStorage.getItem("playlistTracks") || "[]"
      ),
    };
  } catch (e) {
    console.error("Error reading from localStorage", e);
    return {
      title: "",
      author: "",
      character: "",
      spotifyUser: {},
      playlistTracks: [],
    };
  }
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadInitialState(),
  devTools: process.env.NODE_ENV !== "production",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
