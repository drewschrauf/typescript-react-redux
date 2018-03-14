import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import counter, { ICounterState } from './reducers/counter';

const reducer = combineReducers({
  counter,
});

export interface IState {
  counter: ICounterState;
}

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;
