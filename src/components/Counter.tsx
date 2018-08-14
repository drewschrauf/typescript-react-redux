import * as React from 'react';
import { connect } from 'react-redux';
import styledComponents from 'styled-components';

import { IState, Dispatch } from '../store';
import { decrementBy, delayedIncrement, incrementBy } from '../store/actions/counter';

const Counter = styledComponents.div`
  padding: 10px;
  border: 1px dashed black;
`;

const Button = styledComponents.button`
  margin-right: 10px;
  font-family: inherit;
`;

interface IAppProps {
  incrementAmount: number;
}

interface IConnectedState {
  count: number;
  pending: boolean;
}

interface IConnectedDispatch {
  increment: () => void;
  decrement: () => void;
  delayedIncrement: () => void;
}

const AppComponent = ({
  count,
  increment,
  decrement,
  pending,
  delayedIncrement: incrementWithDelay,
}: IAppProps & IConnectedState & IConnectedDispatch) => (
  <Counter>
    <h1>Count {count}</h1>
    <Button className="increment" onClick={increment}>
      Increment
    </Button>
    <Button className="decrement" onClick={decrement}>
      Decrement
    </Button>
    <Button className="delayed-increment" disabled={pending} onClick={incrementWithDelay}>
      Delayed increment
    </Button>
  </Counter>
);

const App = connect(
  (state: IState, _ownProps: IAppProps): IConnectedState => ({
    count: state.counter.count,
    pending: state.counter.pending,
  }),
  (dispatch: Dispatch, ownProps: IAppProps): IConnectedDispatch => ({
    decrement: () => dispatch(decrementBy({ amount: ownProps.incrementAmount })),
    delayedIncrement: () => dispatch(delayedIncrement({ amount: ownProps.incrementAmount })),
    increment: () => dispatch(incrementBy({ amount: ownProps.incrementAmount })),
  }),
)(AppComponent) as React.ComponentClass<IAppProps>;
export default App;
