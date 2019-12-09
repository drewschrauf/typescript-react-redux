/* eslint-disable no-console */
import React from 'react';
import { render } from '@testing-library/react';
import createContextualReducer from '../createContextualReducer';

let err: typeof console.error;
beforeEach(() => {
  err = console.error;
  console.error = jest.fn();
});

afterEach(() => {
  console.error = err;
});

it('should throw if using hook without provider', () => {
  const { useContextualReducer } = createContextualReducer(
    {},
    () => ({}),
    () => ({}),
  );

  const Comp: React.FC = () => {
    useContextualReducer();
    return null;
  };

  expect(() => {
    render(<Comp />);
  }).toThrowError('hook must be used within the corresponding provider');
});
