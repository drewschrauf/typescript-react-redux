import { createAction, isType, createHook } from './util';

const incrementBy = createAction<{ amount: number }>('INCREMENT');
const decrementBy = createAction<{ amount: number }>('DECREMENT');
const beginDelayedIncrement = createAction<{}>('BEGIN_DELAYED_INCREMENT');
const completeDelayedIncrement = createAction<{ amount: number }>('COMPLETE_DELAYED_INCREMENT');

const { Provider, hook } = createHook(
  { count: 0, pending: false },
  (state, action) => {
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
  },
  dispatch => ({
    incrementBy: (amount: number) => dispatch(incrementBy({ amount })),
    decrementBy: (amount: number) => dispatch(decrementBy({ amount })),
    delayedIncrementBy: async (amount: number) => {
      dispatch(beginDelayedIncrement({}));
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch(completeDelayedIncrement({ amount }));
    },
  }),
);
Provider.displayName = 'CounterProvider';
export const CounterProvider = Provider;
export default hook;
