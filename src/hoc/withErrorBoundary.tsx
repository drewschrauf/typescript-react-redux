import React from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  border: 1px solid red;
  padding: 10px;
`;

const errorBoundary = <T extends {}>(Component: React.ComponentType<T>) => {
  return class ErrorBoundary extends React.Component<T, { hasError: boolean }> {
    constructor(props: T) {
      super(props);
      this.state = {
        hasError: false,
      };
    }

    static getDerivedStateFromError() {
      /* eslint-disable-next-line no-console */
      return {
        hasError: true,
      };
    }

    render() {
      const { hasError } = this.state;
      return !hasError ? (
        <Component {...this.props} />
      ) : (
        <ErrorMessage>Something went wrong</ErrorMessage>
      );
    }
  };
};

export default errorBoundary;
