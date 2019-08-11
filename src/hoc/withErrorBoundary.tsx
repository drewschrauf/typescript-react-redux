import React from 'react';
import styled from 'styled-components';

import { BaseError } from '@/errors';

const ErrorMessage = styled.div`
  border: 1px solid red;
  padding: 10px;
`;

interface ErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

const errorBoundary = () => <T extends {}>(Component: React.ComponentType<T>) => {
  return class ErrorBoundary extends React.Component<T, ErrorBoundaryState> {
    public state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(error: Error) {
      let state: ErrorBoundaryState = { hasError: true };
      if (error instanceof BaseError) {
        state = { ...state, message: error.message };
      }
      return state;
    }

    render() {
      const { hasError, message } = this.state;
      return !hasError ? (
        <Component {...this.props} /> // eslint-disable-line react/jsx-props-no-spreading
      ) : (
        <ErrorMessage>{message || 'Something went wrong'}</ErrorMessage>
      );
    }
  };
};

export default errorBoundary;
