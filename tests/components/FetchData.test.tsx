import React from "react";
import {render, waitFor} from "@testing-library/react";
import {vi} from "vitest";
import {FetchDataByID, FetchDataByTerm} from "../../src/api/fetchData";

global.fetch = vi.fn();

describe("FetchDataByTerm", () => {
  it("fetches data and updates state correctly", async () => {
    const mockIsLoading = vi.fn();
    const mockSetNotFound = vi.fn();
    const mockSetCharacters = vi.fn();
    const mockSetTotalPages = vi.fn();
    const mockSetTerm = vi.fn();

    const mockResponse = {
      ok: true,
      json: () =>
        Promise.resolve({
          results: [{id: 1, name: "Rick"}],
          info: {pages: 5},
        }),
    };
    global.fetch.mockResolvedValue(mockResponse);

    render(
      <FetchDataByTerm
        isLoading={mockIsLoading}
        setNotFound={mockSetNotFound}
        setCharacters={mockSetCharacters}
        term="Rick"
        setTotalPages={mockSetTotalPages}
        currentPage={1}
        setTerm={mockSetTerm}
      />,
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/character/?page=1&name=Rick",
      );

      expect(mockIsLoading).toHaveBeenCalledWith(true);
      expect(mockIsLoading).toHaveBeenCalledWith(false);
      expect(mockSetNotFound).toHaveBeenCalledWith(false);
      expect(mockSetCharacters).toHaveBeenCalled();
      expect(mockSetTotalPages).toHaveBeenCalledWith(5);
    });
  });
  it("fetches data by ID and updates state correctly", async () => {
    // Mock functions
    const mockIsDetailedcardLoading = vi.fn();
    const mockSetDetailedCardData = vi.fn();

    // Mock successful API response
    const mockCharacterData = {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
    };
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockCharacterData),
    };
    global.fetch.mockResolvedValue(mockResponse);

    // Render the component
    render(
      <FetchDataByID
        isDetailedcardLoading={mockIsDetailedcardLoading}
        detailedcardID={1}
        setDetailedCardData={mockSetDetailedCardData}
      />,
    );

    // Wait for the component to finish rendering and for the fetch to complete
    await waitFor(() => {
      // Check if fetch was called with the correct URL
      expect(global.fetch).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/character/1",
      );

      // Check if state update functions were called correctly
      expect(mockIsDetailedcardLoading).toHaveBeenCalledWith(true);
      expect(mockIsDetailedcardLoading).toHaveBeenCalledWith(false);
      expect(mockSetDetailedCardData).toHaveBeenCalledWith(mockCharacterData);
    });
  });
});
