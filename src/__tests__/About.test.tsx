import React from 'react';
import { render } from 'react-testing-library';

import About from '@/pages/About';

jest.mock('../../README.md', () => '<h1>Content</h1>');

describe('About', () => {
  it('should match snapshot', () => {
    const root = render(<About />);
    expect(root.container.innerHTML).toMatchSnapshot();
  });

  it('should render README content as markup', () => {
    const root = render(<About />);
    expect(root.getByText('Content')).toBeInTheDocument();
  });
});
