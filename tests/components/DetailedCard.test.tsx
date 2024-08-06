import React from "react";
import {render, screen} from "@testing-library/react";
import DetailedCard from "../../src/components/DetailedCard";
import {vi} from "vitest";
import {Provider} from "react-redux";

import {configureStore} from "@reduxjs/toolkit";
import selectedDataReducer from "../../src/store/slices/selectedDataSlice";
vi.mock("../../src/api/fetchData", () => ({
  FetchDataByID: vi.fn(() => null),
}));

const mockStore = configureStore({
  reducer: {
    selectedData: selectedDataReducer,
  },
});

describe("DetailedCard", () => {
  it("renders loading state when detailedcardLoading is true", () => {
    render(
      <Provider store={mockStore}>
        <DetailedCard
          detailedcardID={1}
          isDetailedcardLoading={true}
          detailedcardLoading={true}
          hideDetailedCard={() => {}}
        />
      </Provider>,
    );

    expect(screen.getByTestId("loader-section")).toBeInTheDocument();
    expect(screen.getByTestId("loader1")).toBeInTheDocument();
    expect(screen.getByTestId("loader2")).toBeInTheDocument();
  });

  it("renders character data when not loading", () => {
    render(
      <Provider store={mockStore}>
        <DetailedCard
          detailedcardID={1}
          isDetailedcardLoading={false}
          detailedcardLoading={false}
          hideDetailedCard={() => {}}
        />
      </Provider>,
    );

    expect(screen.getByText("Status:")).toBeInTheDocument();
    expect(screen.getByText("Species:")).toBeInTheDocument();
    expect(screen.getByText("Gender:")).toBeInTheDocument();
  });
});
