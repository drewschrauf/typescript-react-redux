import React from 'react';
import styled from 'styled-components';

import { BaseError } from '@/errors';

const ErrorMessage = styled.div`
  border: 1px solid red;
  padding: 10px;
`;

const errorBoundary = () => <T extends {}>(Component: React.ComponentType<T>) => {
  return class ErrorBoundary extends React.Component<T, { hasError: boolean; message?: string }> {
    constructor(props: T) {
      super(props);
      this.state = {
        hasError: false,
      };
    }

    static getDerivedStateFromError(error: Error) {
      if (error instanceof BaseError) {
        return { hasError: true, message: error.message };
      }
      return {
        hasError: true,
      };
    }

    render() {
      const { hasError, message } = this.state;
      return !hasError ? (
        <Component {...this.props} />
      ) : (
        <ErrorMessage>{message || 'Something went wrong'}</ErrorMessage>
      );
    }
  };
};

export default errorBoundary;
