/* eslint-disable no-console */
import React from 'react';
import { render } from 'react-testing-library';
import withErrorBoundary from '../withErrorBoundary';

describe('withErrorBoundary', () => {
  let err: any;
  beforeEach(() => {
    err = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = err;
  });

  it('should show provided component if no error', () => {
    const Element = withErrorBoundary(() => <h1>Element</h1>);
    const root = render(<Element />);
    expect(root.getByText('Element')).toBeInTheDocument();
  });

  it('should show error message if error', () => {
    const Element = withErrorBoundary(() => (
      <h1>
        {(() => {
          throw new Error();
        })()}
      </h1>
    ));
    const root = render(<Element />);
    expect(root.getByText('Something went wrong')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });
});
