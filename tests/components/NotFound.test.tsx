import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {describe, it, expect} from "vitest";
import NotFound from "../../src/components/NotFound";

describe("NotFound Component", () => {
  it("renders the correct text", () => {
    render(<NotFound />);
    expect(screen.getByText("There is nothing...")).toBeInTheDocument();
  });
});
