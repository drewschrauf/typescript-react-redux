import React from 'react';

export interface Action<T> {
  /** Action type */
  readonly type: symbol;
  /** Action payload */
  readonly payload: T;
}

interface ActionCreator<T> {
  /** Type of created action */
  readonly type: symbol;
  /** Given a payload, create an action */
  (payload: T): Action<T>;
}

export const createAction = <T extends unknown>(constant?: string): ActionCreator<T> => {
  const type = Symbol(constant);
  return Object.assign((payload: T) => ({ type, payload }), {
    type,
  });
};

export const isType = <T extends unknown>(
  action: Action<unknown>,
  actionCreator: ActionCreator<T>,
): action is Action<T> => action.type === actionCreator.type;

const createContextualReducer = <State, Actions>(
  initialState: State,
  reducer: (state: State, action: Action<unknown>) => State,
  bindActions: (dispatch: React.Dispatch<Action<unknown>>) => Actions,
): {
  Provider: React.ComponentType;
  useContextualReducer: () => [State, Actions];
} => {
  type ContextValue = [State, Actions];

  const Context = React.createContext<ContextValue>(undefined as unknown as ContextValue);

  const Provider: React.FC = <T extends unknown>(props: T) => {
    const [currentState, dispatch] = React.useReducer(reducer, initialState);
    const value = React.useMemo<ContextValue>(
      () => [currentState, bindActions(dispatch)],
      [currentState, dispatch],
    );
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Context.Provider value={value} {...props} />;
  };

  const useContextualReducer = (): ContextValue => {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error('hook must be used within the corresponding provider');
    }
    return context;
  };

  return { Provider, useContextualReducer };
};
export default createContextualReducer;
