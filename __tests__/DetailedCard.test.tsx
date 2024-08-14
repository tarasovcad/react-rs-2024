import React from "react";
import {render, fireEvent} from "@testing-library/react";
import {Provider} from "react-redux";
import configureStore, {MockStoreEnhanced} from "redux-mock-store";
import DetailedCard from "@/components/DetailedCard";
import {RootState} from "@/store";

const mockStore = configureStore<RootState>([]);

describe("DetailedCard", () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      selectedData: {
        selectedItems: [],
      },
    } as RootState);
  });

  it("renders correctly with given props", () => {
    const detailedCardData = {
      name: "Test Name",
      status: "Alive",
      gender: "Male",
      species: "Human",
      image: "image-url",
      id: 1,
    };

    const {getByText} = render(
      <Provider store={store}>
        <DetailedCard
          detailedCardData={detailedCardData}
          hideDetailedCard={() => {}}
        />
      </Provider>,
    );

    expect(getByText("Test Name")).toBeInTheDocument();
  });

  it("dispatches addItem action when checkbox is checked", () => {
    const detailedCardData = {
      name: "Test Name",
      status: "Alive",
      gender: "Male",
      species: "Human",
      image: "image-url",
      id: 1,
    };

    const {getByRole} = render(
      <Provider store={store}>
        <DetailedCard
          detailedCardData={detailedCardData}
          hideDetailedCard={() => {}}
        />
      </Provider>,
    );
    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);

    const actions = store.getActions();
    expect(actions).toEqual([
      {type: "selectedData/addItem", payload: detailedCardData},
    ]);
  });

  it("dispatches removeItem action when checkbox is unchecked", () => {
    store = mockStore({
      selectedData: {
        selectedItems: [{id: 1}],
      },
    });

    const detailedCardData = {
      name: "Test Name",
      status: "Alive",
      gender: "Male",
      species: "Human",
      image: "image-url",
      id: 1,
    };

    const {getByRole} = render(
      <Provider store={store}>
        <DetailedCard
          detailedCardData={detailedCardData}
          hideDetailedCard={() => {}}
        />
      </Provider>,
    );
    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);

    const actions = store.getActions();
    expect(actions).toEqual([
      {type: "selectedData/removeItem", payload: detailedCardData},
    ]);
  });

  it("calls hideDetailedCard when overlay is clicked", () => {
    const detailedCardData = {
      name: "Test Name",
      status: "Alive",
      gender: "Male",
      species: "Human",
      image: "image-url",
      id: 1,
    };

    const hideDetailedCard = jest.fn();

    const {getByTestId} = render(
      <Provider store={store}>
        <DetailedCard
          detailedCardData={detailedCardData}
          hideDetailedCard={hideDetailedCard}
        />
      </Provider>,
    );

    const overlay = getByTestId("overlay");
    fireEvent.click(overlay);
    expect(hideDetailedCard).toHaveBeenCalled();
  });
});
