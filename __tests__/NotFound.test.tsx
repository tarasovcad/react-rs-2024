import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from "@/components/NotFound";

describe("NotFound Component", () => {
  it("renders the correct text", () => {
    render(<NotFound />);
    expect(screen.getByText("There is nothing...")).toBeInTheDocument();
  });
});
