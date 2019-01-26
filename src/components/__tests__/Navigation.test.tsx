import React from 'react';
import { mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from '../Navigation';

describe('Navigation', () => {
  it('should render navigation', () => {
    const root = mount(
      <Router>
        <Navigation />
      </Router>,
    );
    expect(root.html()).toMatchSnapshot('default render');
  });
});
