import React from 'react';
import { renderWithRouter } from './helpers';

import App from '@/App';

jest.mock('../../README.md', () => ({
  html: '<h1>Content</h1>',
}));

it('should render README content as markup', async () => {
  const root = await renderWithRouter(<App />, { route: '/about', waitForId: 'about-page' });
  expect(root.getByText('Content')).toBeInTheDocument();
});

it('should have a link back to github', async () => {
  const root = await renderWithRouter(<App />, { route: '/about', waitForId: 'about-page' });
  const link = root.getByText('View on GitHub');
  expect(link.tagName).toBe('A');
  expect((link as HTMLAnchorElement).href).toBe(
    'https://github.com/drewschrauf/typescript-react-redux',
  );
  expect((link as HTMLAnchorElement).target).toBe('_blank');
});

it('should update the title', async () => {
  document.title = 'Test';
  await renderWithRouter(<App />, { route: '/about', waitForId: 'about-page' });
  expect(document.title).toBe('About | Test');
});
