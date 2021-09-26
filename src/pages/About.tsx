/* eslint-disable react/no-danger */
import React from 'react';

import withErrorBoundary from '@/hoc/withErrorBoundary';
import useUpdateTitle from '@/hooks/useUpdateTitle';
import { html as readme } from '../../README.md';

const AboutPage: React.FC = () => {
  useUpdateTitle('About');

  return (
    <div data-testid="about-page">
      <div dangerouslySetInnerHTML={{ __html: readme }} />
      <p>
        <a
          href="https://github.com/drewschrauf/typescript-react-redux"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </p>
    </div>
  );
};
export default withErrorBoundary()(AboutPage);
