import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from '../Navigation';

configure({ adapter: new Adapter() });

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
