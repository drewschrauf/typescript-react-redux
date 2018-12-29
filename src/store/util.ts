export interface IAction<T> {
  /** Action type */
  readonly type: string;
  /** Action payload */
  readonly payload: T;
}

interface IActionCreator<T> {
  /** Type of created action */
  readonly type: string;
  /** Payload of created action */
  (payload: T): IAction<T>;
}

export const createAction = <T extends {}>(type: string): IActionCreator<T> =>
  Object.assign((payload: T): any => ({ type, payload }), {
    type,
  });

export const isType = <T extends {}>(
  action: IAction<any>,
  actionCreator: IActionCreator<T>,
): action is IAction<T> => action.type === actionCreator.type;
