import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import { ThemeProvider } from "@/providers/ThemeProvider";

describe("ThemeToggleButton", () => {
  it("toggles theme on button click", () => {
    render(
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>,
    );
    const button = screen.getByRole("button");
    expect(button.querySelector(".lucide-moon")).toBeInTheDocument();
    expect(button.querySelector(".lucide-sun")).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(button.querySelector(".lucide-sun")).toBeInTheDocument();
    expect(button.querySelector(".lucide-moon")).not.toBeInTheDocument();
  });
});
