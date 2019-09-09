export interface Action<T> {
  /** Action type */
  readonly type: string;
  /** Action payload */
  readonly payload: T;
}

interface ActionCreator<T> {
  /** Type of created action */
  readonly type: string;
  /** Given a payload, create an action */
  (payload: T): Action<T>;
}

export const createAction = <T>(type: string): ActionCreator<T> =>
  Object.assign((payload: T) => ({ type, payload }), {
    type,
  });

export const isType = <T>(
  action: Action<{}>,
  actionCreator: ActionCreator<T>,
): action is Action<T> => action.type === actionCreator.type;
