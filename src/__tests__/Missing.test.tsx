import React from 'react';
import { renderWithRouter } from './helpers';

import App from '@/App';

it('should show error message', async () => {
  const root = await renderWithRouter(<App />, { route: '/missing', waitForId: 'missing-page' });
  expect(root.getByText("There's nothing here")).toBeInTheDocument();
});
