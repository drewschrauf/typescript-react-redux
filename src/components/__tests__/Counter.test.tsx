import enzyme from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import configureStore, { MockStoreCreator } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { set } from 'lodash/fp';

import Counter from '../Counter';
import { IState } from '../../store';

jest.mock('../../store/actions/counter', () => ({
  incrementBy: (...args: any[]) => ({ type: 'incrementBy', args }),
  decrementBy: (...args: any[]) => ({ type: 'decrementBy', args }),
  delayedIncrement: (...args: any[]) => ({ type: 'delayedIncrement', args }),
}));

enzyme.configure({ adapter: new Adapter() });

const defaultState: IState = { counter: { count: 1, pending: false } };
const defaultProps = { incrementAmount: 1 };

describe('Counter', () => {
  let mockStore: MockStoreCreator<IState>;
  beforeEach(() => {
    mockStore = configureStore<IState>([thunk]);
  });

  it('should render the current count', () => {
    const store = mockStore(defaultState);
    const root = enzyme.shallow(<Counter {...defaultProps} />, { context: { store } }).dive();
    expect(root.find('h1').text()).toBe('Count 1');
  });

  it('should increment when increment button clicked', () => {
    const store = mockStore(defaultState);
    const root = enzyme.shallow(<Counter {...defaultProps} />, { context: { store } }).dive();
    const handler = root.find('.increment').prop('onClick');

    (handler as any)();
    expect(store.getActions()).toEqual([{ type: 'incrementBy', args: [{ amount: 1 }] }]);
  });

  it('should decrement when decrement button clicked', () => {
    const store = mockStore(defaultState);
    const root = enzyme.shallow(<Counter {...defaultProps} />, { context: { store } }).dive();
    const handler = root.find('.decrement').prop('onClick');

    (handler as any)();
    expect(store.getActions()).toEqual([{ type: 'decrementBy', args: [{ amount: 1 }] }]);
  });

  it('should delay increment when delay increment button clicked', () => {
    const store = mockStore(defaultState);
    const root = enzyme.shallow(<Counter {...defaultProps} />, { context: { store } }).dive();
    const handler = root.find('.delayed-increment').prop('onClick');

    (handler as any)();
    expect(store.getActions()).toEqual([{ type: 'delayedIncrement', args: [{ amount: 1 }] }]);
  });

  it('should enable delayed increment by default', () => {
    const store = mockStore(defaultState);
    const root = enzyme.shallow(<Counter {...defaultProps} />, { context: { store } }).dive();
    expect(root.find('.delayed-increment').prop('disabled')).toBe(false);
  });

  it('should disable delayed increment if pending', () => {
    const store = mockStore(set('counter.pending', true, defaultState));
    const root = enzyme.shallow(<Counter {...defaultProps} />, { context: { store } }).dive();
    expect(root.find('.delayed-increment').prop('disabled')).toBe(true);
  });
});
