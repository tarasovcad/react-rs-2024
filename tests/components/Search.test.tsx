import Search from "../../src/components/Search";

import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {SearchContext} from "../../src/App";

// Mock the UseNavigate hook
vi.mock("react-router-dom", () => ({
  BrowserRouter: vi.fn(({children}) => children),
  useNavigate: () => vi.fn(),
}));

// Mock the UseLocalStorage hook
vi.mock("../hooks/useLocalStorage", () => ({
  default: () => ["", vi.fn(), vi.fn()],
}));

describe("Search component", () => {
  const mockSetTerm = vi.fn();
  const mockSetCurrentPage = vi.fn();

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <SearchContext.Provider
          value={{setTerm: mockSetTerm, setCurrentPage: mockSetCurrentPage}}>
          <Search />
        </SearchContext.Provider>
      </BrowserRouter>,
    );
  };

  it("renders the search input and button", () => {
    renderComponent();
    // search input
    expect(
      screen.getByPlaceholderText("Search character...."),
    ).toBeInTheDocument();
    // button
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    renderComponent();
    // get input
    const input = screen.getByPlaceholderText(
      "Search character....",
    ) as HTMLInputElement;
    // update input value
    fireEvent.change(input, {target: {value: "Rick"}});
    expect(input.value).toBe("Rick");
  });
  it("submits the form with correct data", () => {
    renderComponent();
    // get input
    const input = screen.getByPlaceholderText(
      "Search character....",
    ) as HTMLInputElement;
    // get form
    const form = screen.getByRole("form");
    // update input value
    fireEvent.change(input, {target: {value: "Morty"}});
    // submit form
    fireEvent.submit(form);

    expect(mockSetTerm).toHaveBeenCalledWith("Morty");
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
  });
});
