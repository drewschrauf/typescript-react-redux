import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';

import withDelay from '../withDelay';

const DelayedElement = withDelay({ delay: 500 })(() => <h1>Element</h1>);

jest.useFakeTimers();

afterEach(() => {
  jest.restoreAllMocks();
});

it('should not render anything by default', () => {
  const root = render(<DelayedElement />);
  expect(root.container.innerHTML).toBe('');
});

it('should render element after timeout', () => {
  const root = render(<DelayedElement />);
  act(() => {
    jest.runAllTimers();
  });
  expect(root.getByText('Element')).toBeInTheDocument();
});

it('should cancel timer if unmounted before timer expires', () => {
  jest.spyOn(global, 'clearTimeout');
  const root = render(<DelayedElement />);
  root.unmount();
  act(() => {
    jest.runAllTimers();
  });
  expect(clearTimeout).toHaveBeenCalled();
});
