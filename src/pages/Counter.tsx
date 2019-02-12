import React from 'react';
import isNaN from 'lodash/isNaN';

import Counter from '@/components/Counter';
import withErrorBoundary from '@/hoc/withErrorBoundary';
import { ParseError } from '@/errors';

const getIncrementAmount = (by: string = '1') => {
  const value = parseInt(by, 10);
  if (isNaN(value)) {
    throw new ParseError(`You can't use "${by}" as an increment amount!`);
  }
  return value;
};

interface CounterPageProps {
  match: { params: { by?: string } };
}

const CounterPage = ({ match }: CounterPageProps) => (
  <Counter incrementAmount={getIncrementAmount(match.params.by)} />
);
export default withErrorBoundary()(CounterPage);
