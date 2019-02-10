import { Dispatch } from '../index';
import { createAction } from '../util';
import ActionType from './ActionType';
import { setTimeoutP } from './util';

export interface CounterChange {
  /** Amount to modify counter by */
  readonly amount: number;
}

export const incrementBy = createAction<CounterChange>(ActionType.INCREMENT);
export const decrementBy = createAction<CounterChange>(ActionType.DECREMENT);

export const beginDelayedIncrement = createAction<{}>(ActionType.BEGIN_DELAYED_INCREMENT);
export const completeDelayedIncrement = createAction<CounterChange>(
  ActionType.COMPLETE_DELAYED_INCREMENT,
);
export const delayedIncrementBy = (payload: CounterChange) => async (dispatch: Dispatch) => {
  dispatch(beginDelayedIncrement({}));
  await setTimeoutP(500);
  dispatch(completeDelayedIncrement(payload));
};
