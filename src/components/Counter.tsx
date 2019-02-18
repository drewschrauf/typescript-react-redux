import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { State, Dispatch } from '@/store';
import { decrementBy, delayedIncrementBy, incrementBy } from '@/store/actions/counter';

interface CounterProps {
  /** The amount to increment the counter by on each click */
  readonly incrementAmount: number;
}

interface ConnectedProps {
  /** The current count */
  readonly count: number;
  /** Is a delayed increment currently being performed? */
  readonly pending: boolean;
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
  width: 100%;
  height: 32px;
  margin-right: 10px;
  margin-bottom: 5px;
  font-family: inherit;

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
  delayedIncrement,
}: CounterProps & ConnectedProps) => (
  <Wrapper>
    <h1>Count {count}</h1>
    <Button onClick={increment}>Increment by {incrementAmount}</Button>
    <Button onClick={decrement}>Decrement by {incrementAmount}</Button>
    <Button disabled={pending} onClick={delayedIncrement}>
      Delayed increment by {incrementAmount}
    </Button>
  </Wrapper>
);

/**
 * React component that renders the main UI. It displays the current count and provides buttons
 * for modifying it.
 */
const Counter = connect(
  (state: State) => ({
    count: state.counter.count,
    pending: state.counter.pending,
  }),
  (dispatch: Dispatch, ownProps: CounterProps) => ({
    decrement: () => dispatch(decrementBy({ amount: ownProps.incrementAmount })),
    delayedIncrement: () => dispatch(delayedIncrementBy({ amount: ownProps.incrementAmount })),
    increment: () => dispatch(incrementBy({ amount: ownProps.incrementAmount })),
  }),
)(CounterComponent) as React.ComponentClass<CounterProps>;
export default Counter;
