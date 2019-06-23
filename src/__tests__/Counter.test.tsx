/* eslint-disable no-console */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import set from 'lodash/fp/set';

import Counter from '@/pages/Counter';
import { CounterProvider } from '@/state/counter';

const DEFAULT_PROPS = { match: { params: {} } };

jest.useFakeTimers();

const renderWithProvider = (element: React.ReactNode) => {
  return render(<CounterProvider>{element}</CounterProvider>);
};

describe('counter', () => {
  let err: typeof console.error;
  beforeEach(() => {
    err = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = err;
  });

  it('should render current count', () => {
    const root = renderWithProvider(<Counter {...DEFAULT_PROPS} />);

    expect(root.getByText('Count 0')).toBeInTheDocument();
  });

  describe('default increment', () => {
    it('should increment amount when increment button clicked', () => {
      const root = renderWithProvider(<Counter {...DEFAULT_PROPS} />);

      fireEvent.click(root.getByText('Increment by 1'));

      expect(root.getByText('Count 1')).toBeInTheDocument();
    });

    it('should decrement amount when decrement button clicked', () => {
      const root = renderWithProvider(<Counter {...DEFAULT_PROPS} />);

      fireEvent.click(root.getByText('Decrement by 1'));

      expect(root.getByText('Count -1')).toBeInTheDocument();
    });

    it('should delay increment amount when increment button clicked', async () => {
      const root = renderWithProvider(<Counter {...DEFAULT_PROPS} />);

      fireEvent.click(root.getByText('Delayed increment by 1'));
      expect(root.getByText('Count 0')).toBeInTheDocument();
      expect(root.getByText('Delayed increment by 1')).toBeDisabled();

      await Promise.resolve().then(() => jest.runAllTimers());

      expect(root.getByText('Count 1')).toBeInTheDocument();
      expect(root.getByText('Delayed increment by 1')).not.toBeDisabled();
    });
  });

  describe('provided increment', () => {
    it('should increment by given amount when route provides increment amount', () => {
      const root = renderWithProvider(
        <Counter {...set(['match', 'params', 'by'], '7', DEFAULT_PROPS)} />,
      );

      fireEvent.click(root.getByText('Increment by 7'));

      expect(root.getByText('Count 7')).toBeInTheDocument();
    });

    it('should decrement by given amount when route provides decrement amount', () => {
      const root = renderWithProvider(
        <Counter {...set(['match', 'params', 'by'], '7', DEFAULT_PROPS)} />,
      );

      fireEvent.click(root.getByText('Decrement by 7'));

      expect(root.getByText('Count -7')).toBeInTheDocument();
    });

    it('should delay increment by given amount when route provides increment amount', async () => {
      const root = renderWithProvider(
        <Counter {...set(['match', 'params', 'by'], '7', DEFAULT_PROPS)} />,
      );

      fireEvent.click(root.getByText('Delayed increment by 7'));
      expect(root.getByText('Count 0')).toBeInTheDocument();
      expect(root.getByText('Delayed increment by 7')).toBeDisabled();

      await Promise.resolve().then(() => jest.runAllTimers());

      expect(root.getByText('Count 7')).toBeInTheDocument();
      expect(root.getByText('Delayed increment by 7')).not.toBeDisabled();
    });

    it('should show error message if invalid increment amount is given', async () => {
      const root = renderWithProvider(
        <Counter {...set(['match', 'params', 'by'], 'garbage', DEFAULT_PROPS)} />,
      );

      expect(
        root.getByText('You can\'t use "garbage" as an increment amount!'),
      ).toBeInTheDocument();
    });
  });
});
