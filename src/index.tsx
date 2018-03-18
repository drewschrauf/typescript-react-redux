import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Counter from './components/Counter';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Counter incrementAmount={1} />
  </Provider>,
  document.getElementById('app-root'),
);
