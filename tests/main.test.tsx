import React from "react";
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import App from "../src/App";
import NotFound from "../src/components/NotFound";

describe("main.tsx", () => {
  test("renders App component for root path", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByText("Characters")).toBeInTheDocument();
  });

  test("renders NotFound component for invalid path", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    expect(screen.getByText("There is nothing...")).toBeInTheDocument();
  });
});
