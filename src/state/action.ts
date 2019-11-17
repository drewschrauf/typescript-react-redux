export interface Action<T> {
  /** Action type */
  readonly type: Symbol;
  /** Action payload */
  readonly payload: T;
}

interface ActionCreator<T> {
  /** Type of created action */
  readonly type: Symbol;
  /** Given a payload, create an action */
  (payload: T): Action<T>;
}

export const createAction = <T>(constant?: string): ActionCreator<T> => {
  const type = Symbol(constant);
  return Object.assign((payload: T) => ({ type, payload }), {
    type,
  });
};

export const isType = <T>(
  action: Action<{}>,
  actionCreator: ActionCreator<T>,
): action is Action<T> => action.type === actionCreator.type;
