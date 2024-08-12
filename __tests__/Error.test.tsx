import React from "react";
import { render, screen } from "@testing-library/react";
import Error from "@/app/error";

describe("Error Component", () => {
  it("renders without crashing", () => {
    const error = new Error("Test error");
    const resetMock = jest.fn();

    render(<Error error={error} reset={resetMock} />);

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    const button = screen.getByRole("button", { name: /try again/i });
    expect(button).toBeInTheDocument();
  });
});
