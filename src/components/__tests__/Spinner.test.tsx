import React from 'react';
import { mount } from 'enzyme';

import Spinner from '../Spinner';

jest.useFakeTimers();

describe('Spinner', () => {
  it('should not render anything on initial render', () => {
    const root = mount(<Spinner />);
    expect(root.html()).toBe(null);
  });

  it('should render spinner after a timeout', () => {
    const root = mount(<Spinner />);
    jest.runAllTimers();
    root.update();
    expect(root.html()).toMatchSnapshot();
  });
});
