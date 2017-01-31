import { combineReducers, createStore } from "redux";
import counter, { ICounterState } from "./reducers/counter";
import { IAction } from "./util";

const reducer = combineReducers({
  counter,
});

export interface IState {
  counter: ICounterState;
};

const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
