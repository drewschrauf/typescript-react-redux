import React, { useEffect } from 'react';
import isNaN from 'lodash/isNaN';

import Counter from '@/components/Counter';
import withErrorBoundary from '@/hoc/withErrorBoundary';
import { ParseError } from '@/errors';
import useCounter from '@/state/useCounter';

const useUpdateTitle = (title: string) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${title} | ${originalTitle}`;
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
};

const getAmount = (by: string = '1') => {
  const value = parseInt(by, 10);
  if (isNaN(value)) {
    throw new ParseError(`You can't use "${by}" as an increment amount!`);
  }
  return value;
};

interface CounterPageProps {
  match: { params: { by?: string } };
}

const CounterPage = ({ match }: CounterPageProps) => {
  const [{ count }] = useCounter();
  useUpdateTitle(`Count ${count}`);
  return <Counter amount={getAmount(match.params.by)} />;
};
export default withErrorBoundary()(CounterPage);
