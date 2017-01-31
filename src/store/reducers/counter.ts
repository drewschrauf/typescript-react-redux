import { IAction, IncrementAmount, incrementBy, isType } from "../actions/counter";

export interface ICounterState {
  readonly count: number;
}

export default (state: ICounterState = { count: 0 }, action: IAction<any>): ICounterState => {
  if (isType(action, incrementBy)) {
    return {
      count: state.count + action.payload.amount,
    };
  }
  return state;
};
