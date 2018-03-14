import * as _ from 'lodash';

export interface IAction<T> {
  readonly type: string;
  readonly payload: T;
}

interface IActionCreator<T> {
  readonly type: string;
  (payload: T): IAction<T>;
}

export const createAction = <T extends {}>(type: string): IActionCreator<T> =>
  _.assign((payload: T): any => ({ type, payload }), {
    type,
  });

export const isType = <T extends {}>(
  action: IAction<any>,
  actionCreator: IActionCreator<T>,
): action is IAction<T> => action.type === actionCreator.type;
