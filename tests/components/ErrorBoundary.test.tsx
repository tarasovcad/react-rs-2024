import React from "react";
import {render, screen} from "@testing-library/react";
import ErrorBoundary from "../../src/components/ErrorBoundary";

const ErrorThrowingComponent = () => {
  throw new Error("Test error");
};
describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        {/* its a child */}
        <div>Test content</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders error message when an error occurs", () => {
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText(
        "There was a problem processing the request. Plese try again.",
      ),
    ).toBeTruthy();
    expect(screen.getByRole("button", {name: "Reload"})).toBeInTheDocument();
  });
});
