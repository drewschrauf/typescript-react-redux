import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { State, Dispatch } from '../store';
import { decrementBy, delayedIncrement, incrementBy } from '../store/actions/counter';
import testHook from '../testHook';

interface CounterProps {
  /** The amount to increment the counter by on each click */
  readonly incrementAmount: number;
}

interface ConnectedState {
  /** The current count */
  readonly count: number;
  /** Is a delayed increment currently being performed? */
  readonly pending: boolean;
}

interface ConnectedDispatch {
  /** Action to perform when clicking increment button */
  readonly increment: () => void;
  /** Action to perform when clicking decrement button */
  readonly decrement: () => void;
  /** Action to perform when clicking delayed increment button */
  readonly delayedIncrement: () => void;
}

const Wrapper = styled.div`
  padding: 10px;
  border: 1px dashed black;
`;

const Button = styled.button`
  margin-right: 10px;
  font-family: inherit;

  width: 100%;
  margin-bottom: 5px;
  @media screen and (min-width: 450px) {
    width: initial;
    margin-bottom: 0;
  }
`;

const CounterComponent = ({
  incrementAmount,
  count,
  increment,
  decrement,
  pending,
  delayedIncrement: incrementWithDelay,
}: CounterProps & ConnectedState & ConnectedDispatch) => (
  <Wrapper>
    <h1 {...testHook('count')}>Count {count}</h1>
    <Button {...testHook('increment')} onClick={increment}>
      Increment by {incrementAmount}
    </Button>
    <Button {...testHook('decrement')} onClick={decrement}>
      Decrement by {incrementAmount}
    </Button>
    <Button {...testHook('delayed-increment')} disabled={pending} onClick={incrementWithDelay}>
      Delayed increment by {incrementAmount}
    </Button>
  </Wrapper>
);

/**
 * React component that renders the main UI. It displays the current count and provides buttons
 * for modifying it.
 */
const Counter = connect(
  (state: State, _ownProps: CounterProps) => ({
    count: state.counter.count,
    pending: state.counter.pending,
  }),
  (dispatch: Dispatch, ownProps: CounterProps) => ({
    decrement: () => dispatch(decrementBy({ amount: ownProps.incrementAmount })),
    delayedIncrement: () => dispatch(delayedIncrement({ amount: ownProps.incrementAmount })),
    increment: () => dispatch(incrementBy({ amount: ownProps.incrementAmount })),
  }),
)(CounterComponent) as React.ComponentClass<CounterProps>;
export default Counter;
