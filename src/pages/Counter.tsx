import React from 'react';
import isNaN from 'lodash/isNaN';

import Counter from '@/components/Counter';
import withErrorBoundary from '@/hoc/withErrorBoundary';

const getIncrementAmount = (by: string = '1') => {
  const value = parseInt(by, 10);
  return !isNaN(value) ? value : 1;
};

interface CounterPageProps {
  match: { params: { by?: string } };
}

const CounterPage = ({ match }: CounterPageProps) => (
  <Counter incrementAmount={getIncrementAmount(match.params.by)} />
);
export default withErrorBoundary()(CounterPage);
