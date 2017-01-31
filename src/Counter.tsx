import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IState } from "./store";
import { decrementBy, delayedIncrement, incrementBy } from "./store/actions/counter";

interface IAppProps { } // tslint:disable-line:no-empty-interface

interface IConnectedState {
  count: number;
  pending: boolean;
}

interface IConnectedDispatch {
  increment: () => void;
  decrement: () => void;
  delayedIncrement: () => void;
}

const AppComponent = (props: IAppProps & IConnectedState & IConnectedDispatch) => (
  <div>
    <h1>Count {props.count}</h1>
    <button onClick={props.increment}>Increment</button>
    <button onClick={props.decrement}>Decrement</button>
    <button disabled={props.pending} onClick={props.delayedIncrement}>Delayed increment</button>
  </div>
);

const App: React.ComponentClass<IAppProps> = connect(
  (state: IState, ownProps: IAppProps): IConnectedState => ({
    count: state.counter.count,
    pending: state.counter.pending,
  }),
  (dispatch: Dispatch<IState>): IConnectedDispatch => ({
    decrement: () => dispatch(decrementBy({ amount: 1 })),
    delayedIncrement: () => dispatch(delayedIncrement({ amount: 1 })),
    increment: () => dispatch(incrementBy({ amount: 1 })),
  }),
)(AppComponent);
export default App;
