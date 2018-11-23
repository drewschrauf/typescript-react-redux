import React from 'react';
import { Provider } from 'react-redux';

import Counter from './components/Counter';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Counter incrementAmount={1} />
  </Provider>
);
export default App;
