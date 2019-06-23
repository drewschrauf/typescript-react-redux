import React from 'react';

export interface Action<T extends {}> {
  /** Action type */
  readonly type: string;
  /** Action payload */
  readonly payload: T;
}

interface ActionCreator<T extends {}> {
  /** Type of created action */
  readonly type: string;
  /** Given a payload, create an action */
  (payload: T): Action<T>;
}

export const createAction = <T extends {}>(type: string): ActionCreator<T> =>
  Object.assign((payload: T) => ({ type, payload }), {
    type,
  });

export const isType = <T extends {}>(
  action: Action<{}>,
  actionCreator: ActionCreator<T>,
): action is Action<T> => action.type === actionCreator.type;

export const createHook = <State, Actions>(
  initialState: State,
  reducer: (state: State, action: Action<any>) => State,
  bindActions: (dispatch: React.Dispatch<Action<any>>) => Actions,
) => {
  type ContextValue = [State, Actions];

  const Context = React.createContext<ContextValue>(undefined as any);

  const Provider: React.FC = <T extends {}>(props: T) => {
    const [currentState, dispatch] = React.useReducer(reducer, initialState);
    const value = React.useMemo<ContextValue>(() => [currentState, bindActions(dispatch)], [
      currentState,
      dispatch,
    ]);
    return <Context.Provider value={value} {...props} />;
  };

  const hook = () => {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error('hook must be used within the corresponding provider');
    }
    return context;
  };

  return { Provider, hook };
};
