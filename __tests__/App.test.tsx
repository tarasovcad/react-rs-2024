import React from "react";
import Main from "@/components/App";
import { SearchProvider } from "@/providers/SearchProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { store } from "@/store";
import { Props } from "@/types/types";
import { render, screen } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Provider } from "react-redux";

// Mock the useRouter hook
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
// Mock the useSearchParams hook
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("./../src/hooks/useRickAndMortiData", () => ({
  FetchDataByTerm: jest.fn(() => ({
    characters: { results: [{ id: 1, name: "Rick Sanchez" }] },
    notFound: false,
    totalPages: 1,
    isLoading: false,
  })),
}));

const localStorageMock = {
  getItem: jest.fn(() => JSON.stringify("Rick")),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0,
};

const AllProviders = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SearchProvider>{children}</SearchProvider>
      </ThemeProvider>
    </Provider>
  );
};

describe("Main Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: "/",
      query: {},
      push: jest.fn(),
    }));

    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: jest.fn().mockReturnValue("0"), // Mock the get method
      size: 0,
    }));
  });

  it("renders the main heading", () => {
    render(
      <AllProviders>
        <Main />
      </AllProviders>,
    );
    const heading = screen.getByTestId("main-heading");
    expect(heading).toBeInTheDocument();
  });

  it("loads data from localStorage on initial render", () => {
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    render(
      <AllProviders>
        <Main />
      </AllProviders>,
    );
    const heading = screen.getByTestId("main-heading");
    expect(heading).toHaveTextContent("Search results for: Rick");
  });

  it("renders the grid container", () => {
    render(
      <AllProviders>
        <Main />
      </AllProviders>,
    );

    const gridContainer = screen.getByTestId("grid-container");
    expect(gridContainer).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(
      <AllProviders>
        <Main />
      </AllProviders>,
    );

    const description = screen.getByText(
      /All of the characters that appear in the/i,
    );
    expect(description).toBeInTheDocument();
  });
});
