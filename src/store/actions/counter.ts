import { Dispatch } from '../index';
import { createAction } from '../util';
import ActionType from './ActionType';

export interface ICounterChange {
  /** Amount to modify counter by */
  readonly amount: number;
}

export const incrementBy = createAction<ICounterChange>(ActionType.INCREMENT);
export const decrementBy = createAction<ICounterChange>(ActionType.DECREMENT);

export const beginDelayedIncrement = createAction<{}>(ActionType.BEGIN_DELAYED_INCREMENT);
export const completeDelayedIncrement = createAction<ICounterChange>(
  ActionType.COMPLETE_DELAYED_INCREMENT,
);
export const delayedIncrement = (payload: ICounterChange) => (dispatch: Dispatch) => {
  dispatch(beginDelayedIncrement({}));
  setTimeout(() => {
    dispatch(completeDelayedIncrement(payload));
  }, 500);
};
