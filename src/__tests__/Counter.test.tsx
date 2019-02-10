import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { Provider } from 'react-redux';
import set from 'lodash/fp/set';

import Counter from '@/pages/Counter';
import store from '@/store';

const DEFAULT_PROPS = { match: { params: {} } };

jest.useFakeTimers();

const renderWithProvider = (element: React.ReactNode) => {
  return render(<Provider store={store()}>{element}</Provider>);
};

describe('counter', () => {
  it('should render current count', () => {
    const root = renderWithProvider(<Counter {...DEFAULT_PROPS} />);

    expect(root.getByText('Count 0')).toBeInTheDocument();
  });

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
});
