import React from 'react';
import { mount } from 'enzyme';

import Spinner from '../Spinner';

describe('Spinner', () => {
  it('should render spinner', () => {
    const root = mount(<Spinner />);
    expect(root.html()).toMatchSnapshot('default render');
  });
});
