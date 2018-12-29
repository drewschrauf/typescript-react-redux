import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Spinner from '../Spinner';

configure({ adapter: new Adapter() });

describe('Spinner', () => {
  it('should render spinner', () => {
    const root = mount(<Spinner />);
    expect(root.html()).toMatchSnapshot('default render');
  });
});
