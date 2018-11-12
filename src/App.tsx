import React from 'react';
import { Provider } from 'react-redux';

import './index.css';
import Counter from './components/Counter';
import store from './store';

export default () => (
  <Provider store={store}>
    <Counter incrementAmount={1} />
  </Provider>
);
