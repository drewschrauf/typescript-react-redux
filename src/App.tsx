import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Navigation from './components/Navigation';
import Spinner from './components/Spinner';
import store from './store';

const PageWrapper = styled.div`
  width: 100%;
  @media screen and (min-width: 800px) {
    width: 800px;
  }
`;

const CounterPage = lazy(() => import('./pages/Counter'));
const AboutPage = lazy(() => import('./pages/About'));

const App = () => (
  <Router>
    <Provider store={store}>
      <PageWrapper>
        <Navigation />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/" exact component={CounterPage} />
            <Route path="/by/:by/" component={CounterPage} />
            <Route path="/about/" component={AboutPage} />
          </Switch>
        </Suspense>
      </PageWrapper>
    </Provider>
  </Router>
);
export default App;
