import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import Navigation from './components/Navigation';
import store from './store';

import CounterPage from './pages/Counter';
import AboutPage from './pages/About';

const PageWrapper = styled.div`
  width: 100%;
  @media screen and (min-width: 800px) {
    width: 800px;
  }
`;

const App = () => (
  <Router>
    <Provider store={store}>
      <PageWrapper>
        <Navigation />
        <Route path="/" exact component={CounterPage} />
        <Route path="/by/:by/" component={CounterPage} />
        <Route path="/about/" component={AboutPage} />
      </PageWrapper>
    </Provider>
  </Router>
);
export default App;
