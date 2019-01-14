import React from "react";
import reactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import App from "./components/App";

const store = createStore(rootReducer, applyMiddleware(thunk));

reactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
