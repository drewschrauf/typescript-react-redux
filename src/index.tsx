import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';

import Counter from './components/Counter';
import store from './store';

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
  <Provider store={store}>
    <Counter incrementAmount={1} />
  </Provider>,
  root,
);
