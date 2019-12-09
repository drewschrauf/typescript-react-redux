/* eslint-disable no-console */
import React from 'react';
import { render } from '@testing-library/react';
import withErrorBoundary from '../withErrorBoundary';

import { BaseError } from '@/errors';

class TestError extends BaseError {}

let err: typeof console.error;
beforeEach(() => {
  err = console.error;
  console.error = jest.fn();
});

afterEach(() => {
  console.error = err;
});

it('should show provided component if no error', () => {
  const Element = withErrorBoundary()(() => <h1>Element</h1>);
  const root = render(<Element />);
  expect(root.getByText('Element')).toBeInTheDocument();
});

it('should show error message if error', () => {
  const Element = withErrorBoundary()(() => (
    <h1>
      {((): JSX.Element => {
        throw new Error('Basic error');
      })()}
    </h1>
  ));
  const root = render(<Element />);
  expect(root.getByText('Something went wrong')).toBeInTheDocument();
  expect(console.error).toHaveBeenCalled();
});

it('should show customised error if error extends BaseError', () => {
  const Element = withErrorBoundary()(() => (
    <h1>
      {((): JSX.Element => {
        throw new TestError('Customised error');
      })()}
    </h1>
  ));
  const root = render(<Element />);
  expect(root.getByText('Customised error')).toBeInTheDocument();
  expect(console.error).toHaveBeenCalled();
});
