import React from 'react';

import useCounter from '@/state/useCounter';
import { buttonStyle, buttonWrapperStyle, wrapperStyle } from './Counter.css';

interface CounterProps {
  /** The amount to increment or decrement the counter by on each click */
  readonly amount: number;
}

/**
 * React component that renders the main UI. It displays the current count and provides buttons
 * for modifying it.
 */
const Counter: React.FC<CounterProps> = ({ amount }) => {
  const [state, actions] = useCounter();
  return (
    <div className={wrapperStyle}>
      <h1>Count {state.count}</h1>
      <div className={buttonWrapperStyle}>
        <button className={buttonStyle} onClick={(): void => actions.incrementBy(amount)}>
          Increment by {amount}
        </button>
        <button className={buttonStyle} onClick={(): void => actions.decrementBy(amount)}>
          Decrement by {amount}
        </button>
        <button
          className={buttonStyle}
          disabled={state.pending}
          onClick={(): Promise<void> => actions.delayedIncrementBy(amount)}
        >
          Delayed increment by {amount}
        </button>
      </div>
    </div>
  );
};

export default Counter;
