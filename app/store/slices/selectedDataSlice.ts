import {createSlice} from "@reduxjs/toolkit";
import {SelectedDataState} from "../../types/types";

const initialState: SelectedDataState = {
  selectedItems: [],
};

const selectedDataSlice = createSlice({
  name: "selectedData",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.selectedItems.push(action.payload);
    },
    removeItem: (state, action) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id,
      );
    },
    unselectAllItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const {addItem, removeItem, unselectAllItems} =
  selectedDataSlice.actions;

export default selectedDataSlice.reducer;
