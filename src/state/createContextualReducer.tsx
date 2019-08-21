import React from 'react';
import { Action } from './action';

const createContextualReducer = <State, Actions>(
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
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Context.Provider value={value} {...props} />;
  };

  const hook = () => {
    const context = React.useContext(Context);
    /* istanbul ignore if */
    if (!context) {
      throw new Error('hook must be used within the corresponding provider');
    }
    return context;
  };

  return { Provider, hook };
};
export default createContextualReducer;
