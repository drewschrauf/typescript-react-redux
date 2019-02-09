import React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Missing from '@/pages/Missing';

describe('Missing', () => {
  it('should match snapshot', () => {
    const root = render(<Missing />);
    expect(root.getByText("There's nothing here")).toBeInTheDocument();
  });
});
