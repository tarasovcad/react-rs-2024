import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {describe, it, expect, vi} from "vitest";
import {BrowserRouter} from "react-router-dom";
import Pagination from "../../src/components/Pagination";

// Mock the UseNavigate hook
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  BrowserRouter: vi.fn(({children}) => children),
}));

describe("Pagination Component", () => {
  const setCurrentPage = vi.fn();
  const totalPages = 5;
  const currentPage = 3;

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </BrowserRouter>,
    );

  it("renders correctly with given props", () => {
    renderComponent();

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Page 3 of 5")).toBeInTheDocument();
  });

  it("disables Previous button on first page", () => {
    render(
      <BrowserRouter>
        <Pagination
          totalPages={totalPages}
          currentPage={1}
          setCurrentPage={setCurrentPage}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).not.toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(
      <BrowserRouter>
        <Pagination
          totalPages={totalPages}
          currentPage={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText("Previous")).not.toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("calls setCurrentPage and navigates when Previous is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Previous"));
    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });
});
