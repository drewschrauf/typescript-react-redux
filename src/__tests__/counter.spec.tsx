import * as enzyme from 'enzyme';
import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';

import { AppComponent } from '../Counter';

enzyme.configure({ adapter: new Adapter() });

interface AppProps {
  incrementAmount: number;
  count: number;
  pending: boolean;
  increment: () => void;
  decrement: () => void;
  delayedIncrement: () => void;
}

describe('counter', () => {
  let defaultProps: AppProps;
  beforeEach(() => {
    defaultProps = {
      incrementAmount: 1,
      count: 1,
      increment: jest.fn(),
      decrement: jest.fn(),
      delayedIncrement: jest.fn(),
      pending: false,
    };
  });

  it('should render current count', () => {
    const root = enzyme.shallow(<AppComponent {...defaultProps} />);
    expect(root.find('h1').text()).toBe('Count 1');
  });

  it('should increment when increment button clicked', () => {
    const root = enzyme.shallow(<AppComponent {...defaultProps} />);
    const handler = root.find('.increment').prop('onClick');

    (handler as any)();
    expect(defaultProps.increment).toBeCalled();
  });

  it('should decrement when decrement button clicked', () => {
    const root = enzyme.shallow(<AppComponent {...defaultProps} />);
    const handler = root.find('.decrement').prop('onClick');

    (handler as any)();
    expect(defaultProps.decrement).toBeCalled();
  });

  it('should delay increment when delay increment button clicked', () => {
    const root = enzyme.shallow(<AppComponent {...defaultProps} />);
    const handler = root.find('.delayed-increment').prop('onClick');

    (handler as any)();
    expect(defaultProps.delayedIncrement).toBeCalled();
  });

  it('should enable delayed increment by default', () => {
    const root = enzyme.shallow(<AppComponent {...defaultProps} />);
    expect(root.find('.delayed-increment').prop('disabled')).toBe(false);
  });

  test('delayed increment is disabled if pending', () => {
    const root = enzyme.shallow(<AppComponent {...defaultProps} pending />);
    expect(root.find('.delayed-increment').prop('disabled')).toBe(true);
  });
});
