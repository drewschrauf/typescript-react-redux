import * as _ from "lodash";

export interface IAction<T> {
  readonly type: string;
  readonly payload: T;
}

interface IActionCreator<T> {
  readonly type: string;
  (payload: T): IAction<T>;
}

const createAction = <T>(type: string): IActionCreator<T> =>
  _.assign<IActionCreator<T>>(
    (payload: T): any => ({ type, payload }),
    { type },
  );

export const isType = <T>(action: IAction<any>, actionCreator: IActionCreator<T>):
  action is IAction<T> => action.type === actionCreator.type;

export interface IncrementAmount {
  readonly amount: number;
}

export const incrementBy = createAction<IncrementAmount>("INCREMENT");
