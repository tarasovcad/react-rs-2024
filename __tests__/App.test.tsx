import React from "react";
import {render, screen} from "@testing-library/react";
import {useRouter} from "next/navigation";
import Main from "@/components/Main";
import {Provider} from "react-redux";
import {store} from "@/store";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("./../src/components/api/fetchDataByTerm", () => ({
  fetchDataByTerm: jest.fn(),
}));

describe("App Component", () => {
  const mockPush = jest.fn();
  const mockHideDetailedCard = jest.fn();
  const mockHandlePageClick = jest.fn();

  const defaultProps = {
    isDetailsOpen: false,
    term: "",
    currentPage: 1,
    totalPages: 5,
    searchParams: {},
    characters: {
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          species: "Human",
          image: "https://example.com/images/rick.jpg",
        },
        {
          id: 2,
          name: "Morty Smith",
          species: "Human",
          image: "https://example.com/images/morty.jpg",
        },
      ],
    },
    hideDetailedCard: mockHideDetailedCard,
    handlePageClick: mockHandlePageClick,
    detailedcardID: undefined,
    notFound: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    render(
      <Provider store={store}>
        <Main {...defaultProps} />
      </Provider>,
    );

    if (consoleErrorSpy.mock.calls.length > 0) {
      console.log("Caught error:", consoleErrorSpy.mock.calls);
    }
    expect(screen.getByTestId("main-heading")).toBeInTheDocument();
  });
  it("shows 'Not Found' message when no characters are found", () => {
    render(
      <Provider store={store}>
        <Main {...defaultProps} notFound={true} />
      </Provider>,
    );
    expect(screen.getByText(/No characters found/i)).toBeInTheDocument();
  });
});
