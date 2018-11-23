import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { IState, Dispatch } from '../store';
import { decrementBy, delayedIncrement, incrementBy } from '../store/actions/counter';

interface IAppProps {
  /** The amount to increment the counter by on each click */
  readonly incrementAmount: number;
}

interface IConnectedState {
  /** The current count */
  readonly count: number;
  /** Is a delayed increment currently being performed? */
  readonly pending: boolean;
}

interface IConnectedDispatch {
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
}: IAppProps & IConnectedState & IConnectedDispatch) => (
  <Wrapper>
    <h1>Count {count}</h1>
    <Button className="increment" onClick={increment}>
      Increment by {incrementAmount}
    </Button>
    <Button className="decrement" onClick={decrement}>
      Decrement by {incrementAmount}
    </Button>
    <Button className="delayed-increment" disabled={pending} onClick={incrementWithDelay}>
      Delayed increment by {incrementAmount}
    </Button>
  </Wrapper>
);

/**
 * React component that renders the main UI. It displays the current count and provides buttons
 * for modifying it.
 */
const Counter = connect(
  (state: IState, _ownProps: IAppProps): IConnectedState => ({
    count: state.counter.count,
    pending: state.counter.pending,
  }),
  (dispatch: Dispatch, ownProps: IAppProps): IConnectedDispatch => ({
    decrement: () => dispatch(decrementBy({ amount: ownProps.incrementAmount })),
    delayedIncrement: () => dispatch(delayedIncrement({ amount: ownProps.incrementAmount })),
    increment: () => dispatch(incrementBy({ amount: ownProps.incrementAmount })),
  }),
)(CounterComponent) as React.ComponentClass<IAppProps>;
export default Counter;
