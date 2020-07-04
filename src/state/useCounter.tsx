import createContextualReducer, { createAction, isType } from './createContextualReducer';

const incrementBy = createAction<{ amount: number }>('INCREMENT');
const decrementBy = createAction<{ amount: number }>('DECREMENT');
const beginDelayedIncrement = createAction<undefined>('BEGIN_DELAYED_INCREMENT');
const completeDelayedIncrement = createAction<{ amount: number }>('COMPLETE_DELAYED_INCREMENT');

const { Provider, useContextualReducer } = createContextualReducer(
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
    /* istanbul ignore else */
    if (isType(action, completeDelayedIncrement)) {
      return { ...state, pending: false, count: state.count + action.payload.amount };
    }
    /* istanbul ignore next */
    return state;
  },
  (dispatch) => ({
    incrementBy: (amount: number): void => dispatch(incrementBy({ amount })),
    decrementBy: (amount: number): void => dispatch(decrementBy({ amount })),
    delayedIncrementBy: async (amount: number): Promise<void> => {
      dispatch(beginDelayedIncrement(undefined));
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(completeDelayedIncrement({ amount }));
    },
  }),
);
Provider.displayName = 'CounterProvider';
export const CounterProvider = Provider;
export default useContextualReducer;
