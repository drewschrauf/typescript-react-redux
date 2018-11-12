import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

const root = document.createElement('div');
document.body.appendChild(root);

const App = lazy(() => import('./App'));
ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>,
  root,
);
