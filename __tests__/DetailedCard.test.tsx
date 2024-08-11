import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import selectedDataReducer from "@/store/slices/selectedDataSlice";
import DetailedCard from "@/components/DetailedCard";

// Mock the FetchDataByID hook
jest.mock("./../src/hooks/useRickAndMortiData", () => ({
  useFetchDataByID: jest.fn(),
}));

import { useFetchDataByID } from "@/hooks/useRickAndMortiData";

const mockStore = configureStore({
  reducer: {
    selectedData: selectedDataReducer,
  },
});

describe("DetailedCard", () => {
  beforeEach(() => {
    (useFetchDataByID as jest.Mock).mockReturnValue({
      isDetailedcardLoading: true,
      detailedCardData: null,
    });
  });
  it("renders loading state when detailedcardLoading is true", () => {
    render(
      <Provider store={mockStore}>
        <DetailedCard detailedcardID={1} hideDetailedCard={() => {}} />
      </Provider>,
    );

    expect(screen.getByTestId("loader-section")).toBeInTheDocument();
    expect(screen.getByTestId("loader1")).toBeInTheDocument();
    expect(screen.getByTestId("loader2")).toBeInTheDocument();
  });

  it("renders character data when not loading", () => {
    (useFetchDataByID as jest.Mock).mockReturnValue({
      isDetailedcardLoading: false,
      detailedCardData: {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        gender: "Male",
        species: "Human",
        image: "https://example.com/rick.png",
      },
    });
    render(
      <Provider store={mockStore}>
        <DetailedCard detailedcardID={1} hideDetailedCard={() => {}} />
      </Provider>,
    );
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Status:")).toBeInTheDocument();
    expect(screen.getByText("Species:")).toBeInTheDocument();
    expect(screen.getByText("Gender:")).toBeInTheDocument();
  });
  it("handles checkbox change correctly", () => {
    (useFetchDataByID as jest.Mock).mockReturnValue({
      isDetailedcardLoading: false,
      detailedCardData: {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        gender: "Male",
        species: "Human",
        image: "https://example.com/rick.png",
      },
    });

    render(
      <Provider store={mockStore}>
        <DetailedCard detailedcardID={1} hideDetailedCard={() => {}} />
      </Provider>,
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("calls hideDetailedCard on overlay click", () => {
    const hideDetailedCardMock = jest.fn();

    render(
      <Provider store={mockStore}>
        <DetailedCard
          detailedcardID={1}
          hideDetailedCard={hideDetailedCardMock}
        />
      </Provider>,
    );

    fireEvent.click(screen.getByTestId("overlay"));
    expect(hideDetailedCardMock).toHaveBeenCalled();
  });
});
