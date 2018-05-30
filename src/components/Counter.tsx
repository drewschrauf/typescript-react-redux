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

export const AppComponent = (props: IAppProps & IConnectedState & IConnectedDispatch) => (
  <Counter>
    <h1>Count {props.count}</h1>
    <Button className="increment" onClick={props.increment}>
      Increment
    </Button>
    <Button className="decrement" onClick={props.decrement}>
      Decrement
    </Button>
    <Button className="delayed-increment" disabled={props.pending} onClick={props.delayedIncrement}>
      Delayed increment
    </Button>
  </Counter>
);

const App: React.ComponentClass<IAppProps> = connect(
  (state: IState, _ownProps: IAppProps): IConnectedState => ({
    count: state.counter.count,
    pending: state.counter.pending,
  }),
  (dispatch: Dispatch, ownProps: IAppProps): IConnectedDispatch => ({
    decrement: () => dispatch(decrementBy({ amount: ownProps.incrementAmount })),
    delayedIncrement: () => dispatch(delayedIncrement({ amount: ownProps.incrementAmount })),
    increment: () => dispatch(incrementBy({ amount: ownProps.incrementAmount })),
  }),
)(AppComponent);
export default App;
