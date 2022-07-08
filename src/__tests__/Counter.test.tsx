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

  expect(await root.findByRole('heading', { name: /count 0/i })).toBeInTheDocument();
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

  fireEvent.click(await root.findByRole('button', { name: /^increment by 1$/i }));

  expect(await root.findByRole('heading', { name: /count 1/i })).toBeInTheDocument();
});

it('should decrement by default amount when decrement button clicked', async () => {
  const root = await renderWithRouter(<App />, { waitForId: 'counter-page' });

  fireEvent.click(await root.findByRole('button', { name: /^decrement by 1$/i }));

  expect(await root.findByRole('heading', { name: /count -1/i })).toBeInTheDocument();
});

it('should delay increment by default amount when increment button clicked', async () => {
  const root = await renderWithRouter(<App />, { waitForId: 'counter-page' });
  jest.useFakeTimers();

  fireEvent.click(await root.findByRole('button', { name: /^delayed increment by 1$/i }));
  expect(await root.findByRole('heading', { name: /count 0/i })).toBeInTheDocument();
  expect(await root.findByRole('button', { name: /^delayed increment by 1$/i })).toBeDisabled();

  jest.runAllTimers();

  expect(await root.findByRole('heading', { name: /count 1/i })).toBeInTheDocument();
  expect(await root.findByRole('button', { name: /^delayed increment by 1$/i })).not.toBeDisabled();
});

it('should increment by given amount when route provides increment amount', async () => {
  const root = await renderWithRouter(<App />, { route: '/by/7', waitForId: 'counter-page' });

  fireEvent.click(await root.findByRole('button', { name: /^increment by 7$/i }));

  expect(await root.findByRole('heading', { name: /count 7/i })).toBeInTheDocument();
});

it('should decrement by given amount when route provides decrement amount', async () => {
  const root = await renderWithRouter(<App />, { route: '/by/7', waitForId: 'counter-page' });

  fireEvent.click(await root.findByRole('button', { name: /^decrement by 7$/i }));

  expect(await root.findByRole('heading', { name: /count -7/i })).toBeInTheDocument();
});

it('should delay increment by given amount when route provides increment amount', async () => {
  const root = await renderWithRouter(<App />, { route: '/by/7', waitForId: 'counter-page' });
  jest.useFakeTimers();

  fireEvent.click(await root.findByRole('button', { name: /^delayed increment by 7$/i }));
  expect(await root.findByRole('heading', { name: /count 0/i })).toBeInTheDocument();
  expect(await root.findByRole('button', { name: /^delayed increment by 7$/i })).toBeDisabled();

  jest.runAllTimers();

  expect(await root.findByRole('heading', { name: /count 7/i })).toBeInTheDocument();
  expect(await root.findByRole('button', { name: /^delayed increment by 7$/i })).not.toBeDisabled();
});

it('should show error message if invalid increment amount is given', async () => {
  const root = await renderWithRouter(<App />, { route: '/by/garbage', waitForId: 'error-page' });

  expect(root.getByText('You can\'t use "garbage" as an increment amount!')).toBeInTheDocument();
});
