import React from 'react';
import { render } from 'react-testing-library';

import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from '../Navigation';

describe('Navigation', () => {
  it('should render navigation', () => {
    const root = render(
      <Router>
        <Navigation />
      </Router>,
    );
    expect(root.container.innerHTML).toMatchSnapshot();
  });
});
