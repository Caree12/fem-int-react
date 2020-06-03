// mostly code from reactjs.org/docs/error-boundaries.html
import React, { Component, ErrorInfo } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends Component {
  // move state from being on a constructor to being a public class property
  // constructor(props) {
  //   super(props);
  //   this.state = { hasError: false, redirect: false };
  // }

  public state = {
    hasError: false,
    redirect: false
  }

  public static getDerivedStateFromError() {
    return { hasError: true };
  }
  // define what the params types are - come in from React
  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  public componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }
  public render() {
    if (this.state.redirect) {
      // explicityly set to true for noThrow
      return <Redirect to="/" noThrow={true} />;
    }

    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page or wait five seconds
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
