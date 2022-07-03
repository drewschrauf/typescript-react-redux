import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import 'normalize.css';
import * as styles from './index.css';
import Spinner from '@/components/Spinner';

const root = document.getElementById('root');
if (!root) {
  throw new Error('#root not found');
}
root.classList.add(styles.root);

const App = lazy(() => import('./App'));
createRoot(root).render(
  <Router>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </Router>,
);
