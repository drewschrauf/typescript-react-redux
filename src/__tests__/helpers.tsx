/* eslint-disable import/prefer-default-export */
import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export const renderWithRouter = async (
  ui: React.ReactElement,
  { route = '/', waitForId }: { route?: string; waitForId?: string } = {},
): Promise<RenderResult> => {
  const history = createMemoryHistory({ initialEntries: [route] });
  const root = render(<Router history={history}>{ui}</Router>);
  if (waitForId) {
    await root.findByTestId(waitForId);
  }
  return root;
};
