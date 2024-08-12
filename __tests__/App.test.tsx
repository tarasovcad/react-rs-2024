import React from "react";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import App from "@/components/App";
import ClientProviders from "@/providers/ClientProviders";
import { useFetchDataByTerm } from "@/hooks/useRickAndMortiData";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the custom hook
jest.mock("./../src/hooks/useRickAndMortiData", () => ({
  useFetchDataByTerm: jest.fn(),
}));

describe("App Component", () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });
  (useFetchDataByTerm as jest.Mock).mockReturnValue({
    characters: { results: [] },
    notFound: false,
    totalPages: 0,
    isLoading: false,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <ClientProviders>
        <App search={1} searchParams={{ page: "1", term: "", details: "0" }} />
      </ClientProviders>,
    );
    expect(screen.getByTestId("main-heading")).toBeInTheDocument();
  });
});
