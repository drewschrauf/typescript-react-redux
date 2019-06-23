import React from 'react';
import styled from 'styled-components';

import { useCounter } from '@/state/counter';

interface CounterProps {
  /** The amount to increment or decrement the counter by on each click */
  readonly amount: number;
}

const Wrapper = styled.div`
  padding: 10px;
  border: 1px dashed black;
`;

const Button = styled.button`
  width: 100%;
  height: 32px;
  margin-right: 10px;
  margin-bottom: 5px;
  font-family: inherit;

  @media screen and (min-width: 450px) {
    width: initial;
    margin-bottom: 0;
  }
`;

/**
 * React component that renders the main UI. It displays the current count and provides buttons
 * for modifying it.
 */
const Counter = ({ amount }: CounterProps) => {
  const [state, actions] = useCounter();
  return (
    <Wrapper>
      <h1>Count {state.count}</h1>
      <Button onClick={() => actions.incrementBy(amount)}>Increment by {amount}</Button>
      <Button onClick={() => actions.decrementBy(amount)}>Decrement by {amount}</Button>
      <Button disabled={state.pending} onClick={() => actions.delayedIncrementBy(amount)}>
        Delayed increment by {amount}
      </Button>
    </Wrapper>
  );
};

export default Counter;
