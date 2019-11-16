import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import { renderWithRouter } from './helpers';

import App from '@/App';

jest.mock('../../README.md', () => '<h1>Content</h1>');

it('should navigate from home to about', async () => {
  const root = await renderWithRouter(<App />, { waitForId: 'counter-page' });

  fireEvent.click(root.getByText('About'));

  const aboutPage = await waitForElement(() => root.getByTestId('about-page'));
  expect(aboutPage).toBeInTheDocument();
});

it('should navigate from about to home', async () => {
  const root = await renderWithRouter(<App />, { route: '/about', waitForId: 'about-page' });

  fireEvent.click(root.getByText('Count'));

  const counterPage = await waitForElement(() => root.getByTestId('counter-page'));
  expect(counterPage).toBeInTheDocument();
});

it('should navigate from home to by', async () => {
  const root = await renderWithRouter(<App />, { waitForId: 'counter-page' });

  fireEvent.click(root.getByText('By 3'));

  expect(root.getByText('Increment by 3')).toBeInTheDocument();
});
