import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/Pagination";

const mockPush = jest.fn();

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockPush,
    };
  },
}));

describe("Pagination Component", () => {
  const setCurrentPage = jest.fn();
  const totalPages = 5;
  const currentPage = 3;

  const renderComponent = () =>
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with given props", () => {
    renderComponent();

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Page 3 of 5")).toBeInTheDocument();
  });

  it("disables Previous button on first page", () => {
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={1}
        setCurrentPage={setCurrentPage}
      />,
    );

    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).not.toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={totalPages}
        setCurrentPage={setCurrentPage}
      />,
    );

    expect(screen.getByText("Previous")).not.toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });
  it("calls setCurrentPage and router.push when Next button is clicked", () => {
    renderComponent();

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(setCurrentPage).toHaveBeenCalledWith(currentPage + 1);
    expect(mockPush).toHaveBeenCalledWith(`/search/${currentPage + 1}`);
  });
  it("calls setCurrentPage and router.push when Previous button is clicked", () => {
    renderComponent();

    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);

    expect(setCurrentPage).toHaveBeenCalledWith(currentPage - 1);
    expect(mockPush).toHaveBeenCalledWith(`/search/${currentPage - 1}`);
  });
});
