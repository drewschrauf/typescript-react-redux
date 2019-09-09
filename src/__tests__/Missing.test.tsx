import React from 'react';
import { render } from '@testing-library/react';

import Missing from '@/pages/Missing';

it('should match snapshot', () => {
  const root = render(<Missing />);
  expect(root.getByText("There's nothing here")).toBeInTheDocument();
});
