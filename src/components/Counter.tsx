import React from 'react';
import styled from 'styled-components';

import useCounter from '@/state/useCounter';
import { Sizes } from '@/styles';

interface CounterProps {
  /** The amount to increment or decrement the counter by on each click */
  readonly amount: number;
}

const Wrapper = styled.div`
  padding: 10px;
  border: 1px dashed black;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${Sizes.sm}px) {
    flex-direction: row;
  }
`;

const Button = styled.button`
  flex: 1;
  flex-basis: 32px;
  font-family: inherit;

  &:not(:last-child) {
    margin: 0 0 5px;
  }

  @media screen and (min-width: ${Sizes.sm}px) {
    flex-basis: initial;
    height: 32px;
    &:not(:last-child) {
      margin: 0 10px 0 0;
    }
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
      <Buttons>
        <Button onClick={() => actions.incrementBy(amount)}>Increment by {amount}</Button>
        <Button onClick={() => actions.decrementBy(amount)}>Decrement by {amount}</Button>
        <Button disabled={state.pending} onClick={() => actions.delayedIncrementBy(amount)}>
          Delayed increment by {amount}
        </Button>
      </Buttons>
    </Wrapper>
  );
};

export default Counter;
