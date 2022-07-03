import React from 'react';

import { BaseError } from '@/errors';
import { errorMessageStyle } from './withErrorBoundary.css';

interface ErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

const errorBoundary =
  () =>
  <T extends Record<string, unknown>>(
    Component: React.ComponentType<T>,
  ): React.ComponentClass<T> => {
    return class ErrorBoundary extends React.Component<T, ErrorBoundaryState> {
      constructor(props: T) {
        super(props);
        this.state = { hasError: false };
      }

      static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        let state: ErrorBoundaryState = { hasError: true };
        if (error instanceof BaseError) {
          state = { ...state, message: error.message };
        }
        return state;
      }

      render(): JSX.Element {
        const { hasError, message } = this.state;
        return !hasError ? (
          <Component {...this.props} />
        ) : (
          <div className={errorMessageStyle} data-testid="error-page">
            {message || 'Something went wrong'}
          </div>
        );
      }
    };
  };

export default errorBoundary;
