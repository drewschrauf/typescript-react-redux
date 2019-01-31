import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import isNaN from 'lodash/isNaN';

import Counter from '../components/Counter';
import errorBoundary from '../hoc/errorBoundary';

const getIncrementAmount = (by: any) => {
  const value = parseInt(by, 10);
  return !isNaN(value) ? value : 1;
};

const CounterPage = ({ match }: RouteComponentProps) => (
  <Counter incrementAmount={getIncrementAmount((match.params as any).by)} />
);
export default errorBoundary(CounterPage);
