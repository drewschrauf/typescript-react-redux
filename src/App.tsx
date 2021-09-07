import React, { Suspense, lazy } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';

import { CounterProvider } from '@/state/useCounter';
import Navigation from '@/components/Navigation';
import Spinner from '@/components/Spinner';
import { pageWrapperStyle } from './App.css';

const CounterPage = lazy(() => import('@/pages/Counter'));
const AboutPage = lazy(() => import('@/pages/About'));
const MissingPage = lazy(() => import('@/pages/Missing'));

const App: React.FC = () => (
  <CounterProvider>
    <div className={pageWrapperStyle}>
      <Navigation />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact component={CounterPage} />
          <Route path="/by/:by/" component={CounterPage} />
          <Route path="/about/" component={AboutPage} />
          <Route component={MissingPage} />
        </Switch>
      </Suspense>
    </div>
  </CounterProvider>
);
export default hot(App);
