import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Counter from "./Counter";
import store from "./store";

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render((
  <Provider store={store}>
    <Counter />
  </Provider>
), root);
