"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { SanctuaryErrorFallback } from "@/features/sanctuary/components/SanctuaryErrorFallback";

type SanctuaryErrorBoundaryProps = {
  children: ReactNode;
  onReset: () => void;
};

type SanctuaryErrorBoundaryState = {
  error: Error | null;
};

export class SanctuaryErrorBoundary extends Component<
  SanctuaryErrorBoundaryProps,
  SanctuaryErrorBoundaryState
> {
  state: SanctuaryErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): SanctuaryErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Sanctuary scene failed to load", error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ error: null });
    this.props.onReset();
  };

  render() {
    if (this.state.error) {
      return <SanctuaryErrorFallback onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}
