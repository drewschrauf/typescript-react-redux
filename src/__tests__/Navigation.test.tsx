import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouter } from './helpers';

import App from '@/App';

jest.mock('../../README.md', () => '<h1>Content</h1>');

it('should navigate from home to about', async () => {
  const root = await renderWithRouter(<App />, { waitForId: 'counter-page' });

  fireEvent.click(root.getByText('About'));

  const aboutPage = await root.findByTestId('about-page');
  expect(aboutPage).toBeInTheDocument();
});

it('should navigate from about to home', async () => {
  const root = await renderWithRouter(<App />, { route: '/about', waitForId: 'about-page' });

  fireEvent.click(root.getByText('Count'));

  const counterPage = await root.findByTestId('counter-page');
  expect(counterPage).toBeInTheDocument();
});

it('should navigate from home to count by', async () => {
  const root = await renderWithRouter(<App />, { waitForId: 'counter-page' });

  fireEvent.click(root.getByText('By 3'));

  expect(root.getByText('Increment by 3')).toBeInTheDocument();
});

it('should navigate from about to count by', async () => {
  const root = await renderWithRouter(<App />, { route: '/about', waitForId: 'about-page' });

  fireEvent.click(root.getByText('By 3'));

  await root.findByTestId('counter-page');
  expect(root.getByText('Increment by 3')).toBeInTheDocument();
});
