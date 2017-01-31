import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IState } from "./store";
import { incrementBy } from "./store/actions/counter";

interface IAppProps {
  title: string;
}

interface IConnectedState {
  count: number;
}

interface IConnectedDispatch {
  increment: () => void;
}

class AppComponent extends React.Component<IAppProps & IConnectedState & IConnectedDispatch, void> {
  public render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>Count {this.props.count}</h2>
        <button onClick={this.props.increment}>Click Me</button>
      </div>
    );
  }
}

const App: React.ComponentClass<IAppProps> = connect(
  (state: IState, ownProps: IAppProps): IConnectedState => ({
    count: state.counter.count,
  }),
  (dispatch: Dispatch<IState>): IConnectedDispatch => ({
    increment: () => dispatch(incrementBy({ amount: 1 })),
  }),
)(AppComponent);
export default App;
