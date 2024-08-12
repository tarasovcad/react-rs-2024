import React, { ErrorInfo } from 'react';
import { type Props } from '../types/types';
interface ErrorState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, ErrorState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ error: error, errorInfo: errorInfo });
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          <img src="../images/error.png" alt="error" width={65} height={65} loading="lazy" />
          <h1>Something went wrong</h1>
          <p>There was a problem processing the request. Plese try again.</p>
          <p>Reload the app!</p>
          <p className="error-info">
            <span>Your error: </span>
            {this.state.errorInfo?.componentStack}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
