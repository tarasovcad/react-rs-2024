import React, {useContext} from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {ThemeProvider} from "./../../src/context/ThemeProvider";
import {ThemeContext} from "./../../src/context/ThemeContext";

describe("ThemeProvider", () => {
  it("toggles theme mode", () => {
    const TestComponent = () => {
      const {isDarkMode, toggleTheme} = useContext(ThemeContext);
      return (
        <div>
          <span data-testid="theme-mode">{isDarkMode ? "Dark" : "Light"}</span>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeMode = screen.getByTestId("theme-mode");
    const toggleButton = screen.getByText("Toggle Theme");

    expect(themeMode).toHaveTextContent("Light");

    fireEvent.click(toggleButton);
    expect(themeMode).toHaveTextContent("Dark");

    fireEvent.click(toggleButton);
    expect(themeMode).toHaveTextContent("Light");
  });
});
