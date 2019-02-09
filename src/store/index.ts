import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import counter, { CounterState } from './reducers/counter';
import { Action } from './util';

const reducer = combineReducers({
  counter,
});

export interface State {
  counter: CounterState;
}

export type Dispatch = ThunkDispatch<State, any, Action<any>>;

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (initialState?: State) =>
  createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));
