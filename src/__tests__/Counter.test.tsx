/* eslint-disable no-console */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouter } from './helpers';

import App from '@/App';

let err: typeof console.error;
beforeEach(() => {
  err = console.error;
  console.error = jest.fn();
  jest.useRealTimers();
});

afterEach(() => {
  console.error = err;
});

it('should render current count', async () => {
  const root = await renderWithRouter(<App />, { waitForId: 'counter-page' });

  expect(root.getByText('Count 0')).toBeInTheDocument();
});

it('should render current count in title', async () => {
  document.title = 'Test';
  await renderWithRouter(<App />, { waitForId: 'counter-page' });

  expect(document.title).toEqual('Count 0 | Test');
});

it('should render updated count in title', async () => {
  document.title = 'Test';
  const root = await renderWithRouter(<App />, { waitForId: 'counter-page' });

  fireEvent.click(root.getByText('Increment by 1'));

  expect(document.title).toEqual('Count 1 | Test');
});

it('should revert title when unmounted', async () => {
  document.title = 'Test';
  const root = await renderWithRouter(<App />, { waitForId: 'counter-page' });

  root.unmount();

  expect(document.title).toEqual('Test');
});

it('should increment by default amount when increment button clicked', async () => {
  const root = await renderWithRouter(<App />, { waitForId: 'counter-page' });

  fireEvent.click(root.getByText('Increment by 1'));

  expect(root.getByText('Count 1')).toBeInTheDocument();
});

it('should decrement by default amount when decrement button clicked', async () => {
  const root = await renderWithRouter(<App />, { waitForId: 'counter-page' });

  fireEvent.click(root.getByText('Decrement by 1'));

  expect(root.getByText('Count -1')).toBeInTheDocument();
});

it('should delay increment by default amount when increment button clicked', async () => {
  const root = await renderWithRouter(<App />, { waitForId: 'counter-page' });
  jest.useFakeTimers();

  fireEvent.click(root.getByText('Delayed increment by 1'));
  expect(root.getByText('Count 0')).toBeInTheDocument();
  expect(root.getByText('Delayed increment by 1')).toBeDisabled();

  await Promise.resolve().then(() => jest.runAllTimers());

  expect(root.getByText('Count 1')).toBeInTheDocument();
  expect(root.getByText('Delayed increment by 1')).not.toBeDisabled();
});

it('should increment by given amount when route provides increment amount', async () => {
  const root = await renderWithRouter(<App />, { route: '/by/7', waitForId: 'counter-page' });

  fireEvent.click(root.getByText('Increment by 7'));

  expect(root.getByText('Count 7')).toBeInTheDocument();
});

it('should decrement by given amount when route provides decrement amount', async () => {
  const root = await renderWithRouter(<App />, { route: '/by/7', waitForId: 'counter-page' });

  fireEvent.click(root.getByText('Decrement by 7'));

  expect(root.getByText('Count -7')).toBeInTheDocument();
});

it('should delay increment by given amount when route provides increment amount', async () => {
  const root = await renderWithRouter(<App />, { route: '/by/7', waitForId: 'counter-page' });
  jest.useFakeTimers();

  fireEvent.click(root.getByText('Delayed increment by 7'));
  expect(root.getByText('Count 0')).toBeInTheDocument();
  expect(root.getByText('Delayed increment by 7')).toBeDisabled();

  await Promise.resolve().then(() => jest.runAllTimers());

  expect(root.getByText('Count 7')).toBeInTheDocument();
  expect(root.getByText('Delayed increment by 7')).not.toBeDisabled();
});

it('should show error message if invalid increment amount is given', async () => {
  const root = await renderWithRouter(<App />, { route: '/by/garbage', waitForId: 'error-page' });

  expect(root.getByText('You can\'t use "garbage" as an increment amount!')).toBeInTheDocument();
});
