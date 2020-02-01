/* eslint-disable react/no-danger */
import React from 'react';
import styled from 'styled-components';

import withErrorBoundary from '@/hoc/withErrorBoundary';
import useUpdateTitle from '@/hooks/useUpdateTitle';
import readme from '../../README.md';

const ReadmeContent = styled.div`
  a {
    display: none;
  }
`;

const AboutPage: React.FC = () => {
  useUpdateTitle('About');

  return (
    <div data-testid="about-page">
      <ReadmeContent dangerouslySetInnerHTML={{ __html: readme }} />
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
