import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Spinner from './components/Spinner';

const root = document.createElement('div');
document.body.appendChild(root);

const App = lazy(() => import('./App'));
ReactDOM.render(
  <Suspense fallback={<Spinner />}>
    <App />
  </Suspense>,
  root,
);
