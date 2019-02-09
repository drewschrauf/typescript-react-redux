import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { Provider } from 'react-redux';
import set from 'lodash/fp/set';

import Counter from '@/pages/Counter';
import store from '@/store';

const DEFAULT_PROPS = { match: { params: {} } } as any;

jest.useFakeTimers();

describe('counter', () => {
  it('should render current count', () => {
    const root = render(
      <Provider store={store()}>
        <Counter {...DEFAULT_PROPS} />
      </Provider>,
    );

    expect(root.getByText('Count 0')).toBeInTheDocument();
  });

  it('should increment amount when increment button clicked', () => {
    const root = render(
      <Provider store={store()}>
        <Counter {...DEFAULT_PROPS} />
      </Provider>,
    );

    fireEvent.click(root.getByText('Increment by 1'));

    expect(root.getByText('Count 1')).toBeInTheDocument();
  });

  it('should decrement amount when decrement button clicked', () => {
    const root = render(
      <Provider store={store()}>
        <Counter {...DEFAULT_PROPS} />
      </Provider>,
    );

    fireEvent.click(root.getByText('Decrement by 1'));

    expect(root.getByText('Count -1')).toBeInTheDocument();
  });

  it('should delay increment amount when increment button clicked', async () => {
    const root = render(
      <Provider store={store()}>
        <Counter {...DEFAULT_PROPS} />
      </Provider>,
    );

    fireEvent.click(root.getByText('Delayed increment by 1'));
    expect(root.getByText('Count 0')).toBeInTheDocument();
    expect(root.getByText('Delayed increment by 1')).toBeDisabled();

    await Promise.resolve().then(() => jest.runAllTimers());

    expect(root.getByText('Count 1')).toBeInTheDocument();
    expect(root.getByText('Delayed increment by 1')).not.toBeDisabled();
  });

  it('should increment by given amount when route provides increment amount', () => {
    const root = render(
      <Provider store={store()}>
        <Counter {...set(['match', 'params', 'by'], '7', DEFAULT_PROPS)} />
      </Provider>,
    );

    fireEvent.click(root.getByText('Increment by 7'));

    expect(root.getByText('Count 7')).toBeInTheDocument();
  });
});
