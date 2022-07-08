import React from 'react';

import Counter from '@/components/Counter';
import withErrorBoundary from '@/hoc/withErrorBoundary';
import { ParseError } from '@/errors';
import useCounter from '@/state/useCounter';
import useUpdateTitle from '@/hooks/useUpdateTitle';
import { useParams } from 'react-router-dom';

const useIncrementAmount = (): number => {
  const { by = '1' } = useParams();

  const amount = parseInt(by, 10);
  if (Number.isNaN(amount)) {
    throw new ParseError(`You can't use "${by}" as an increment amount!`);
  }

  return amount;
};

const CounterPage: React.FC = () => {
  const amount = useIncrementAmount();
  const [{ count }] = useCounter();
  useUpdateTitle(`Count ${count}`);
  return (
    <div data-testid="counter-page">
      <Counter amount={amount} />
    </div>
  );
};
export default withErrorBoundary()(CounterPage);
