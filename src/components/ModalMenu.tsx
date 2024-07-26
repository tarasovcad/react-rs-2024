import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {unselectAllItems} from "../store/slices/selectedDataSlice";
import ExportCSV from "../api/downloadAllItems";
const ModalMenu = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedData.selectedItems,
  );
  const unselectAllCheckboxes = () => {
    dispatch(unselectAllItems());
  };

  return (
    <div className="flex sticky bottom-[50px] bg-main p-4 rounded-lg shadow-lg w-fit m-auto items-center">
      <h1 className="text-lg font-semibold p-0 m-0">
        {selectedItems.length} items are selected
      </h1>
      <button
        onClick={unselectAllCheckboxes}
        className="bg-hover text-black font-semibold py-2 px-2 rounded hover:bg-white mr-2 ml-5">
        Unselect all
      </button>
      <button
        onClick={() =>
          ExportCSV({data: selectedItems, fileName: `${selectedItems.length}`})
        }
        className="bg-hover text-black py-2 font-semibold px-2 rounded hover:bg-green-700 hover:bg-white">
        Download
      </button>
    </div>
  );
};

export default ModalMenu;
