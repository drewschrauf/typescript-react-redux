import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import counter, { ICounterState } from './reducers/counter';
import { IAction } from './util';

const reducer = combineReducers({
  counter,
});

export interface IState {
  counter: ICounterState;
}

export type Dispatch = ThunkDispatch<IState, any, IAction<any>>;

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
