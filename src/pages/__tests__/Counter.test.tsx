import React from 'react';
import { shallow } from 'enzyme';

import Counter from '../Counter';
import CounterComponent from '../../components/Counter';

describe('Counter', () => {
  it('should render counter with increment of 1 by default', () => {
    const root = shallow(<Counter {...{ match: { params: {} } } as any} />);
    expect(root.find(CounterComponent).prop('incrementAmount')).toEqual(1);
  });

  it('should render counter with given increment amount', () => {
    const root = shallow(<Counter {...{ match: { params: { by: '3' } } } as any} />);
    expect(root.find(CounterComponent).prop('incrementAmount')).toEqual(3);
  });
});
