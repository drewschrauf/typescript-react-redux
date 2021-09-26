import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import 'normalize.css';
import { rootStyle } from './index.css';
import Spinner from '@/components/Spinner';

const root = document.getElementById('root');
if (!root) {
  throw new Error('#root not found');
}
root.classList.add(rootStyle);

const App = lazy(() => import('./App'));
ReactDOM.render(
  <Router>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </Router>,
  root,
);
