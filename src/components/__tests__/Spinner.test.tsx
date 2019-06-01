import React from 'react';
import { render, act } from '@testing-library/react';

import Spinner from '../Spinner';

jest.useFakeTimers();

describe('Spinner', () => {
  it('should not render anything on initial render', () => {
    const root = render(<Spinner />);
    expect(root.container.innerHTML).toBe('');
  });

  it('should render spinner after a timeout', () => {
    const root = render(<Spinner />);
    act(() => {
      jest.runAllTimers();
    });
    expect(root.container.innerHTML).toMatchSnapshot();
  });
});
