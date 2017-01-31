import { decrementBy, incrementBy } from "../actions/counter";
import { IAction, isType } from "../util";

export interface ICounterState {
  readonly count: number;
}

export default (state: ICounterState = { count: 0 }, action: IAction<any>): ICounterState => {
  if (isType(action, incrementBy)) {
    return {
      count: state.count + action.payload.amount,
    };
  }
  if (isType(action, decrementBy)) {
    return {
      count: state.count - action.payload.amount,
    };
  }
  return state;
};
