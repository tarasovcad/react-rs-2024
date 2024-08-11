// src/pages/Page.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "@/app/404";

jest.mock("./../src/components/NotFound", () => {
  return function MockNotFound() {
    return <div data-testid="not-found">Not Found Component</div>;
  };
});

describe("Page Component", () => {
  it("renders the NotFound component", () => {
    render(<Page />);

    // Check if the mocked NotFound component is rendered
    const notFoundElement = screen.getByTestId("not-found");
    expect(notFoundElement).toBeInTheDocument();
    expect(notFoundElement).toHaveTextContent("Not Found Component");
  });
});
