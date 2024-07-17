import React from "react";
import {describe, it, expect} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import * as fetchDataModule from "../../src/api/fetchData";
import App from "../../src/App";

vi.mock("../../src/api/fetchData", () => ({
  FetchDataByTerm: vi.fn(),
}));

// Mock the useNavigate hook
const mockedUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
  };
});

vi.mock("../../src/components/DetailedCard", () => ({
  default: vi.fn(() => (
    <div data-testid="mocked-detailed-card">Mocked DetailedCard</div>
  )),
}));

const localStorageMock = {
  getItem: vi.fn(() => JSON.stringify("Rick")),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
};

const AppWrapper = () => (
  <MemoryRouter>
    <App />
  </MemoryRouter>
);

describe("App Component", () => {
  it("renders the main heading", () => {
    render(<AppWrapper />);

    const heading = screen.getByTestId("main-heading");
    expect(heading).toBeInTheDocument();
  });

  it("loads data from localStorage on initial render", () => {
    Object.defineProperty(window, "localStorage", {value: localStorageMock});
    render(<AppWrapper />);
    const heading = screen.getByTestId("main-heading");
    expect(heading).toHaveTextContent("Search results for: Rick");
  });

  it("renders the Navbar component", () => {
    render(<AppWrapper />);

    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();

    const errorButton = screen.getByText("Throw error");
    expect(errorButton).toBeInTheDocument();

    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();
  });
  it("renders the grid container", () => {
    render(<AppWrapper />);

    const gridContainer = screen.getByTestId("grid-container");
    expect(gridContainer).toBeInTheDocument();
  });
  it("renders the description", () => {
    render(<AppWrapper />);

    const description = screen.getByText(
      /All of the characters that appear in the/i,
    );
    expect(description).toBeInTheDocument();
  });

  it("displays loading state when fetching data", async () => {
    const mockFetchDataByTerm = vi.mocked(fetchDataModule.FetchDataByTerm);
    mockFetchDataByTerm.mockImplementation(({isLoading}) => {
      isLoading(true);
      return null;
    });
    render(<AppWrapper />);
    await waitFor(() => {
      const loader = screen.getByTestId("loader");
      expect(loader).toBeInTheDocument();
    });

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it('displays "No characters found" message when no results', async () => {
    const mockFetchDataByTerm = vi.mocked(fetchDataModule.FetchDataByTerm);

    mockFetchDataByTerm.mockImplementation(({setNotFound}) => {
      setNotFound(true);
      return null;
    });

    render(<AppWrapper />);

    await waitFor(() => {
      const notFoundMessage = screen.getByTestId("not-found");
      expect(notFoundMessage).toBeInTheDocument();
      expect(notFoundMessage.textContent).toBe("No characters found :(");
    });
  });
});
