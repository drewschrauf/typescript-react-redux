import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './index.css';
import Spinner from '@/components/Spinner';

const root = document.createElement('div');
root.classList.add('root');
document.body.appendChild(root);

const App = lazy(() => import('./App'));
ReactDOM.render(
  <Suspense fallback={<Spinner />}>
    <App />
  </Suspense>,
  root,
);
