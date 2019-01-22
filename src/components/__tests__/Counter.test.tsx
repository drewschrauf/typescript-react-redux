import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore, { MockStoreCreator } from 'redux-mock-store';
import thunk from 'redux-thunk';
import set from 'lodash/fp/set';

import Counter from '../Counter';
import { State } from '../../store';
import { selectorForTestHook } from '../../testHook';

configure({ adapter: new Adapter() });

const INCREMENT_BUTTON_SELECTOR = selectorForTestHook('increment', 'button');
const DECREMENT_BUTTON_SELECTOR = selectorForTestHook('decrement', 'button');
const DELAYED_INCREMENT_BUTTON_SELECTOR = selectorForTestHook('delayed-increment', 'button');

enum TestActionTypes {
  incrementBy,
  decrementBy,
  delayedIncrement,
}

jest.mock('../../store/actions/counter', () => ({
  incrementBy: (...args: any[]) => ({ type: TestActionTypes.incrementBy, args }),
  decrementBy: (...args: any[]) => ({ type: TestActionTypes.decrementBy, args }),
  delayedIncrement: (...args: any[]) => ({ type: TestActionTypes.delayedIncrement, args }),
}));

const defaultState: State = { counter: { count: 1, pending: false } };
const defaultProps = { incrementAmount: 1 };

describe('Counter', () => {
  let mockStore: MockStoreCreator<State>;
  beforeEach(() => {
    mockStore = configureStore<State>([thunk]);
  });

  it('should match the snapshot', () => {
    const store = mockStore(defaultState);
    const root = mount(
      <Provider store={store}>
        <Counter {...defaultProps} />
      </Provider>,
    );
    expect(root.html()).toMatchSnapshot('default render');
  });

  it('should render the current count', () => {
    const store = mockStore(defaultState);
    const root = mount(
      <Provider store={store}>
        <Counter {...defaultProps} />
      </Provider>,
    );
    expect(root.find('h1').text()).toBe('Count 1');
  });

  it('should increment when increment button clicked', () => {
    const store = mockStore(defaultState);
    const root = mount(
      <Provider store={store}>
        <Counter {...defaultProps} />
      </Provider>,
    );
    const handler = root.find(INCREMENT_BUTTON_SELECTOR).prop('onClick');

    (handler as any)();
    expect(store.getActions()).toEqual([
      { type: TestActionTypes.incrementBy, args: [{ amount: 1 }] },
    ]);
  });

  it('should decrement when decrement button clicked', () => {
    const store = mockStore(defaultState);
    const root = mount(
      <Provider store={store}>
        <Counter {...defaultProps} />
      </Provider>,
    );
    const handler = root.find(DECREMENT_BUTTON_SELECTOR).prop('onClick');

    (handler as any)();
    expect(store.getActions()).toEqual([
      { type: TestActionTypes.decrementBy, args: [{ amount: 1 }] },
    ]);
  });

  it('should delay increment when delay increment button clicked', () => {
    const store = mockStore(defaultState);
    const root = mount(
      <Provider store={store}>
        <Counter {...defaultProps} />
      </Provider>,
    );
    const handler = root.find(DELAYED_INCREMENT_BUTTON_SELECTOR).prop('onClick');

    (handler as any)();
    expect(store.getActions()).toEqual([
      { type: TestActionTypes.delayedIncrement, args: [{ amount: 1 }] },
    ]);
  });

  it('should enable delayed increment by default', () => {
    const store = mockStore(defaultState);
    const root = mount(
      <Provider store={store}>
        <Counter {...defaultProps} />
      </Provider>,
    );
    expect(root.find(DELAYED_INCREMENT_BUTTON_SELECTOR).prop('disabled')).toBe(false);
  });

  it('should disable delayed increment if pending', () => {
    const store = mockStore(set('counter.pending', true, defaultState));
    const root = mount(
      <Provider store={store}>
        <Counter {...defaultProps} />
      </Provider>,
    );
    expect(root.find(DELAYED_INCREMENT_BUTTON_SELECTOR).prop('disabled')).toBe(true);
  });
});
