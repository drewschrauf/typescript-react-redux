import { Dispatch } from '../index';
import { createAction } from '../util';
import ActionType from './ActionType';

export interface IIncrementAmount {
  readonly amount: number;
}

export const incrementBy = createAction<IIncrementAmount>(ActionType.INCREMENT);
export const decrementBy = createAction<IIncrementAmount>(ActionType.DECREMENT);

export const beginDelayedIncrement = createAction<{}>(ActionType.BEGIN_DELAYED_INCREMENT);
export const completeDelayedIncrement = createAction<IIncrementAmount>(
  ActionType.COMPLETE_DELAYED_INCREMENT,
);
export const delayedIncrement = (payload: IIncrementAmount) => (dispatch: Dispatch) => {
  dispatch(beginDelayedIncrement({}));
  setTimeout(() => {
    dispatch(completeDelayedIncrement(payload));
  }, 500);
};
