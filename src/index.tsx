import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render((
  <Provider store={store}>
    <App title="Hi there" />
  </Provider>
), root);
