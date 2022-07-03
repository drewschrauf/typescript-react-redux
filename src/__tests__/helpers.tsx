import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const renderWithRouter = async (
  ui: React.ReactElement,
  { route = '/', waitForId }: { route?: string; waitForId?: string } = {},
): Promise<RenderResult> => {
  const root = render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
  if (waitForId) {
    await root.findByTestId(waitForId);
  }
  return root;
};
