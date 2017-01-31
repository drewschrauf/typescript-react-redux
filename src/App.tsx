import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IState } from "./store";
import { decrementBy, incrementBy } from "./store/actions/counter";

interface IAppProps {
  title: string;
}

interface IConnectedState {
  count: number;
}

interface IConnectedDispatch {
  increment: () => void;
  decrement: () => void;
}

const AppComponent = (props: IAppProps & IConnectedState & IConnectedDispatch) => (
  <div>
    <h1>Count {props.count}</h1>
    <button onClick={props.increment}>Increment</button>
    <button onClick={props.decrement}>Decrement</button>
  </div>
);

const App: React.ComponentClass<IAppProps> = connect(
  (state: IState, ownProps: IAppProps): IConnectedState => ({
    count: state.counter.count,
  }),
  (dispatch: Dispatch<IState>): IConnectedDispatch => ({
    decrement: () => dispatch(decrementBy({ amount: 1 })),
    increment: () => dispatch(incrementBy({ amount: 1 })),
  }),
)(AppComponent);
export default App;
