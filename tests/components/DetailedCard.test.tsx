import React from "react";
import {render, screen} from "@testing-library/react";
import DetailedCard from "../../src/components/DetailedCard";
import {vi} from "vitest";

vi.mock("../../src/api/fetchData", () => ({
  FetchDataByID: vi.fn(() => null),
}));

describe("DetailedCard", () => {
  it("renders loading state when detailedcardLoading is true", () => {
    render(
      <DetailedCard
        detailedcardID={1}
        isDetailedcardLoading={true}
        detailedcardLoading={true}
        hideDetailedCard={() => {}}
      />,
    );

    expect(screen.getByTestId("loader-section")).toBeInTheDocument();
    expect(screen.getByTestId("loader1")).toBeInTheDocument();
    expect(screen.getByTestId("loader2")).toBeInTheDocument();
  });

  it("renders character data when not loading", () => {
    render(
      <DetailedCard
        detailedcardID={1}
        isDetailedcardLoading={false}
        detailedcardLoading={false}
        hideDetailedCard={() => {}}
      />,
    );

    expect(screen.getByText("Status:")).toBeInTheDocument();
    expect(screen.getByText("Species:")).toBeInTheDocument();
    expect(screen.getByText("Gender:")).toBeInTheDocument();
  });
});
