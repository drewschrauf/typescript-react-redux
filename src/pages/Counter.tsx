import React from 'react';

import Counter from '@/components/Counter';
import withErrorBoundary from '@/hoc/withErrorBoundary';
import { ParseError } from '@/errors';
import useCounter from '@/state/useCounter';
import useUpdateTitle from '@/hooks/useUpdateTitle';
import { useParams } from 'react-router-dom';

const getAmount = (by = '1'): number => {
  const value = parseInt(by, 10);
  if (Number.isNaN(value)) {
    throw new ParseError(`You can't use "${by}" as an increment amount!`);
  }
  return value;
};

const CounterPage: React.FC = () => {
  const { by } = useParams();
  const [{ count }] = useCounter();
  useUpdateTitle(`Count ${count}`);
  return (
    <div data-testid="counter-page">
      <Counter amount={getAmount(by)} />
    </div>
  );
};
export default withErrorBoundary()(CounterPage);
