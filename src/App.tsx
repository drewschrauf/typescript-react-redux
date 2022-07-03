import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CounterProvider } from '@/state/useCounter';
import Navigation from '@/components/Navigation';
import Spinner from '@/components/Spinner';
import * as styles from './App.css';

const CounterPage = lazy(() => import('@/pages/Counter'));
const AboutPage = lazy(() => import('@/pages/About'));
const MissingPage = lazy(() => import('@/pages/Missing'));

const App: React.FC = () => (
  <CounterProvider>
    <div className={styles.pageWrapper}>
      <Navigation />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<CounterPage />} />
          <Route path="/by/:by/" element={<CounterPage />} />
          <Route path="/about/" element={<AboutPage />} />
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </Suspense>
    </div>
  </CounterProvider>
);

export default App;
