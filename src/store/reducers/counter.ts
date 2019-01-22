import { Action, isType } from '../util';
import {
  beginDelayedIncrement,
  completeDelayedIncrement,
  decrementBy,
  incrementBy,
} from '../actions/counter';

export interface CounterState {
  /** The current count */
  readonly count: number;
  /** Is a delayed increment currently pending? */
  readonly pending: boolean;
}

const initialState: CounterState = {
  count: 0,
  pending: false,
};

export default (state: CounterState = initialState, action: Action<any>): CounterState => {
  if (isType(action, incrementBy)) {
    return {
      ...state,
      count: state.count + action.payload.amount,
    };
  }
  if (isType(action, decrementBy)) {
    return {
      ...state,
      count: state.count - action.payload.amount,
    };
  }
  if (isType(action, beginDelayedIncrement)) {
    return {
      ...state,
      pending: true,
    };
  }
  if (isType(action, completeDelayedIncrement)) {
    return {
      count: state.count + action.payload.amount,
      pending: false,
    };
  }
  return state;
};
