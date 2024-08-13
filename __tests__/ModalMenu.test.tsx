import {render, screen, fireEvent} from "@testing-library/react";
import {Provider} from "react-redux";
import configureStore, {MockStoreEnhanced} from "redux-mock-store";
import {unselectAllItems} from "@/store/slices/selectedDataSlice";
import ModalMenu from "@/components/redux/ModalMenu";
import {RootState} from "@/types/types";

// Define the root state type which includes the selected data state

const mockStore = configureStore<RootState>([]);

const initialState: RootState = {
  selectedData: {
    selectedItems: [],
  },
};
describe("ModalMenu", () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <ModalMenu />
      </Provider>,
    );
    expect(screen.getByText(/items are selected/i)).toBeInTheDocument();
  });

  it("should show the modal when items are selected", () => {
    store = mockStore({
      selectedData: {
        selectedItems: [
          {id: 1, name: "item1"},
          {id: 2, name: "item2"},
        ],
      },
    });

    render(
      <Provider store={store}>
        <ModalMenu />
      </Provider>,
    );

    expect(screen.getByText(/2 items are selected/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", {name: /Unselect all/i}),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", {name: /Download/i})).toBeInTheDocument();
  });

  it('should dispatch unselectAllItems action when "Unselect all" button is clicked', () => {
    render(
      <Provider store={store}>
        <ModalMenu />
      </Provider>,
    );

    fireEvent.click(screen.getByRole("button", {name: /Unselect all/i}));
    expect(store.dispatch).toHaveBeenCalledWith(unselectAllItems());
  });
});
