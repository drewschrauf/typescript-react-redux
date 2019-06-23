import React from 'react';
import { createAction, Action, isType } from './util';

interface CounterState {
  count: number;
  pending: boolean;
}
interface CounterActions {
  incrementBy: (amount: number) => void;
  decrementBy: (amount: number) => void;
  delayedIncrementBy: (amount: number) => Promise<void>;
}
type CounterContextValue = [CounterState, CounterActions];

const incrementBy = createAction<{ amount: number }>('INCREMENT');
const decrementBy = createAction<{ amount: number }>('DECREMENT');
const beginDelayedIncrement = createAction<{}>('BEGIN_DELAYED_INCREMENT');
const completeDelayedIncrement = createAction<{ amount: number }>('COMPLETE_DELAYED_INCREMENT');

const initialState = { count: 0, pending: false };
const reducer = (state: CounterState, action: Action<any>) => {
  if (isType(action, incrementBy)) {
    return { ...state, count: state.count + action.payload.amount };
  }
  if (isType(action, decrementBy)) {
    return { ...state, count: state.count - action.payload.amount };
  }
  if (isType(action, beginDelayedIncrement)) {
    return { ...state, pending: true };
  }
  if (isType(action, completeDelayedIncrement)) {
    return { ...state, pending: false, count: state.count + action.payload.amount };
  }
  return state;
};

const bindActions = (dispatch: React.Dispatch<Action<any>>) => ({
  incrementBy: (amount: number) => dispatch(incrementBy({ amount })),
  decrementBy: (amount: number) => dispatch(decrementBy({ amount })),
  delayedIncrementBy: async (amount: number) => {
    dispatch(beginDelayedIncrement({}));
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch(completeDelayedIncrement({ amount }));
  },
});

const CounterContext = React.createContext<CounterContextValue>(undefined as any);

export const CounterProvider = <T extends {}>(props: T) => {
  const [currentState, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo<CounterContextValue>(() => [currentState, bindActions(dispatch)], [
    currentState,
    dispatch,
  ]);
  return <CounterContext.Provider value={value} {...props} />;
};

export const useCounter = () => {
  const context = React.useContext(CounterContext);
  if (!context) {
    throw new Error('useCount must be used within a CounterProvider');
  }
  return context;
};
