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

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;
