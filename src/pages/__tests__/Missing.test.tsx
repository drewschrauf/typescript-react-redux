import React from 'react';
import { mount } from 'enzyme';

import Missing from '../Missing';

describe('Missing', () => {
  it('should match snapshot', () => {
    const root = mount(<Missing />);
    expect(root.html()).toMatchSnapshot();
  });
});
