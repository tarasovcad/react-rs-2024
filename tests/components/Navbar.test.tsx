import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Navbar from "../../src/components/Navbar";

describe("Navbar Component", () => {
  it("renders the logo and error button", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );

    // Check if the logo is rendered
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();

    // Check if the error button is rendered
    const errorButton = screen.getByText("Throw error");
    expect(errorButton).toBeInTheDocument();
  });

  it("throws an error when the error button is clicked", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );

    // Click the error button
    const errorButton = screen.getByText("Throw error");
    expect(() => {
      fireEvent.click(errorButton);
    }).toThrow("This is a test error");
  });
});
