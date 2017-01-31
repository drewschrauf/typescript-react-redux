import * as _ from "lodash";
import { Dispatch } from "redux";
import { IState } from "../index";
import { createAction } from "../util";
import { BEGIN_DELAYED_INCREMENT, COMPLETE_DELAYED_INCREMENT, DECREMENT, INCREMENT } from "./constants";

export interface IIncrementAmount {
  readonly amount: number;
}

export const incrementBy = createAction<IIncrementAmount>(INCREMENT);
export const decrementBy = createAction<IIncrementAmount>(DECREMENT);

export const beginDelayedIncrement = createAction<{}>(BEGIN_DELAYED_INCREMENT);
export const completeDelayedIncrement = createAction<IIncrementAmount>(COMPLETE_DELAYED_INCREMENT);
export const delayedIncrement = (payload: IIncrementAmount) => (dispatch: Dispatch<IState>) => {
  dispatch(beginDelayedIncrement({}));
  setTimeout(() => {
    dispatch(completeDelayedIncrement(payload));
  }, 500);
};
