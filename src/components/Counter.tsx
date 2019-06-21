import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { State, Dispatch } from '@/store';
import { decrementBy, delayedIncrementBy, incrementBy } from '@/store/actions/counter';

interface CounterProps {
  /** The amount to increment the counter by on each click */
  readonly incrementAmount: number;
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
const Counter = ({ incrementAmount: amount }: CounterProps) => {
  const count = useSelector((state: State) => state.counter.count);
  const pending = useSelector((state: State) => state.counter.pending);
  const dispatch = useDispatch<Dispatch>();
  return (
    <Wrapper>
      <h1>Count {count}</h1>
      <Button onClick={() => dispatch(incrementBy({ amount }))}>Increment by {amount}</Button>
      <Button onClick={() => dispatch(decrementBy({ amount }))}>Decrement by {amount}</Button>
      <Button disabled={pending} onClick={() => dispatch(delayedIncrementBy({ amount }))}>
        Delayed increment by {amount}
      </Button>
    </Wrapper>
  );
};

export default Counter;
