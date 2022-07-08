import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouter } from './helpers';

import App from '@/App';

jest.mock('../../README.md', () => '<h1>Content</h1>');

it('should navigate from home to about', async () => {
  const root = await renderWithRouter(<App />, { waitForId: 'counter-page' });

  fireEvent.click(await root.findByRole('link', { name: /about/i }));

  const aboutPage = await root.findByTestId('about-page');
  expect(aboutPage).toBeInTheDocument();
});

it('should navigate from about to home', async () => {
  const root = await renderWithRouter(<App />, { route: '/about', waitForId: 'about-page' });

  fireEvent.click(await root.findByRole('link', { name: /count/i }));

  const counterPage = await root.findByTestId('counter-page');
  expect(counterPage).toBeInTheDocument();
});

it('should navigate from home to count by', async () => {
  const root = await renderWithRouter(<App />, { waitForId: 'counter-page' });

  fireEvent.click(await root.findByRole('link', { name: /by 3/i }));

  expect(await root.findByRole('button', { name: /^increment by 3$/i })).toBeInTheDocument();
});

it('should navigate from about to count by', async () => {
  const root = await renderWithRouter(<App />, { route: '/about', waitForId: 'about-page' });

  fireEvent.click(await root.findByRole('link', { name: /by 3/i }));

  await root.findByTestId('counter-page');
  expect(await root.findByRole('button', { name: /^increment by 3$/i })).toBeInTheDocument();
});
