import selectedDataReducer, {
  addItem,
  removeItem,
  unselectAllItems,
} from "../../src/store/slices/selectedDataSlice";

describe("selectedDataSlice", () => {
  it("should handle addItem", () => {
    const initialState = {selectedItems: []};
    const newItem = {id: 1, name: "Test Item"};
    const action = addItem(newItem);
    const newState = selectedDataReducer(initialState, action);
    expect(newState.selectedItems).toEqual([newItem]);
  });

  it("should handle removeItem", () => {
    const initialState = {selectedItems: [{id: 1, name: "Test Item"}]};
    const itemToRemove = {id: 1, name: "Test Item"};
    const action = removeItem(itemToRemove);
    const newState = selectedDataReducer(initialState, action);
    expect(newState.selectedItems).toEqual([]);
  });

  it("should handle unselectAllItems", () => {
    const initialState = {
      selectedItems: [
        {id: 1, name: "Test Item"},
        {id: 2, name: "Another Item"},
      ],
    };
    const action = unselectAllItems();
    const newState = selectedDataReducer(initialState, action);
    expect(newState.selectedItems).toEqual([]);
  });
});
