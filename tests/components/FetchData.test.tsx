import React from "react";
import {render, waitFor} from "@testing-library/react";
import {FetchDataByID, FetchDataByTerm} from "../../src/api/fetchData";
import {Provider} from "react-redux";
import {store} from "./../../src/store/index";
import {vi} from "vitest";

describe("FetchDataByTerm", () => {
  it("fetches data and updates state correctly", async () => {
    const mockIsLoading = vi.fn();
    const mockSetNotFound = vi.fn();
    const mockSetCharacters = vi.fn();
    const mockSetTotalPages = vi.fn();
    const mockSetTerm = vi.fn();
    const props = {
      isLoading: mockIsLoading,
      setNotFound: mockSetNotFound,
      setCharacters: mockSetCharacters,
      setTotalPages: mockSetTotalPages,
      term: "Rick",
      currentPage: 1,
      setTerm: mockSetTerm,
    };

    render(
      <Provider store={store}>
        <FetchDataByTerm {...props} />
      </Provider>,
    );

    expect(mockIsLoading).toHaveBeenCalledWith(true);
    await waitFor(() => {
      expect(mockIsLoading).toHaveBeenCalledWith(false);
      expect(mockSetNotFound).toHaveBeenCalledWith(false);
    });
  });
});

describe("FetchDataByID", () => {
  it("fetches data by ID and updates state correctly", async () => {
    const mockIsDetailedcardLoading = vi.fn();
    const mockSetDetailedCardData = vi.fn();

    render(
      <Provider store={store}>
        <FetchDataByID
          isDetailedcardLoading={mockIsDetailedcardLoading}
          detailedcardID={1}
          setDetailedCardData={mockSetDetailedCardData}
        />
      </Provider>,
    );

    expect(mockIsDetailedcardLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(mockIsDetailedcardLoading).toHaveBeenCalledWith(false);
    });
  });
});
