import React from 'react';
import { render } from '@testing-library/react';

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

  it('should have a link back to github', () => {
    const root = render(<About />);
    const link = root.getByText('View on GitHub');
    expect(link.tagName).toBe('A');
    expect((link as HTMLAnchorElement).href).toBe(
      'https://github.com/drewschrauf/typescript-react-redux',
    );
    expect((link as HTMLAnchorElement).target).toBe('_blank');
  });
});
