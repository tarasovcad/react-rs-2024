import React from "react";
import {Provider} from "react-redux";
import {render, screen, fireEvent, waitFor, act} from "@testing-library/react";
import {configureStore} from "@reduxjs/toolkit";

import selectedDataReducer from "@/store/slices/selectedDataSlice";
import DetailedCard from "@/components/DetailedCard";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        gender: "Male",
        species: "Human",
        image: "https://example.com/rick.png",
      }),
  }),
) as jest.Mock;

const mockStore = configureStore({
  reducer: {
    selectedData: selectedDataReducer,
  },
});

describe("DetailedCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders character data after loading", async () => {
    await act(async () => {
      render(
        <Provider store={mockStore}>
          <DetailedCard detailedcardID={1} hideDetailedCard={() => {}} />
        </Provider>,
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Status:")).toBeInTheDocument();
      expect(screen.getByText("Species:")).toBeInTheDocument();
      expect(screen.getByText("Gender:")).toBeInTheDocument();
    });
  });

  it("handles checkbox change correctly", async () => {
    await act(async () => {
      render(
        <Provider store={mockStore}>
          <DetailedCard detailedcardID={1} hideDetailedCard={() => {}} />
        </Provider>,
      );
    });

    await waitFor(() => {
      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });

  it("calls hideDetailedCard on overlay click", async () => {
    const hideDetailedCardMock = jest.fn();

    await act(async () => {
      render(
        <Provider store={mockStore}>
          <DetailedCard
            detailedcardID={1}
            hideDetailedCard={hideDetailedCardMock}
          />
        </Provider>,
      );
    });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("overlay"));
      expect(hideDetailedCardMock).toHaveBeenCalled();
    });
  });
});
