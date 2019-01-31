import React from 'react';
import styled from 'styled-components';

type ReactComponent<T> = React.ComponentClass<T> | React.StatelessComponent<T>;

const ErrorMessage = styled.div`
  border: 1px solid red;
  padding: 10px;
`;

const errorBoundary = <T extends {}>(Component: ReactComponent<T>) => {
  return class ErrorBoundary extends React.Component<T, { hasError: boolean }> {
    constructor(props: T) {
      super(props);
      this.state = {
        hasError: false,
      };
    }

    static getDerivedStateFromError(error: Error) {
      /* eslint-disable-next-line no-console */
      console.error('Caught error', error);
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
