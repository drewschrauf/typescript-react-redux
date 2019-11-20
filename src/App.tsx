import React, { Suspense, lazy } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { CounterProvider } from '@/state/useCounter';
import Navigation from '@/components/Navigation';
import Spinner from '@/components/Spinner';
import { Sizes } from '@/styles';

const PageWrapper = styled.div`
  width: 100%;
  max-width: ${Sizes.md}px;
`;

const CounterPage = lazy(() => import('@/pages/Counter'));
const AboutPage = lazy(() => import('@/pages/About'));
const MissingPage = lazy(() => import('@/pages/Missing'));

const App = () => (
  <CounterProvider>
    <PageWrapper>
      <Navigation />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact component={CounterPage} />
          <Route path="/by/:by/" component={CounterPage} />
          <Route path="/about/" component={AboutPage} />
          <Route component={MissingPage} />
        </Switch>
      </Suspense>
    </PageWrapper>
  </CounterProvider>
);
export default hot(App);
