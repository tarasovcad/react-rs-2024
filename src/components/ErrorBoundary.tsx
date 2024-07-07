import React, {ErrorInfo} from "react";
import {Props} from "../types/types";

interface ErrorState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, ErrorState> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false, error: null, errorInfo: null};
  }
  static getDerivedStateFromError(error: Error) {
    return {hasError: true, error: error};
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({error: error, errorInfo: errorInfo});
    console.log(error, errorInfo);
  }
  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          <img
            src="./../../src/assets/images/error.png"
            alt="error"
            width={65}
            height={65}
            loading="lazy"
          />
          <h1>Something went wrong</h1>
          <p>There was a problem processing the request. Plese try again.</p>
          <button onClick={this.handleReload}>Reload</button>
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
