export interface Action<T> {
  /** Action type */
  readonly type: string;
  /** Action payload */
  readonly payload: T;
}

interface ActionCreator<T> {
  /** Type of created action */
  readonly type: string;
  /** Payload of created action */
  (payload: T): Action<T>;
}

export const createAction = <T extends {}>(type: string): ActionCreator<T> =>
  Object.assign((payload: T): any => ({ type, payload }), {
    type,
  });

export const isType = <T extends {}>(
  action: Action<any>,
  actionCreator: ActionCreator<T>,
): action is Action<T> => action.type === actionCreator.type;
