import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
const ModalMenu = () => {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedData.selectedItems,
  );
  console.log(selectedItems);
  return (
    <div className="flex sticky bottom-[50px] bg-main p-4 rounded-lg shadow-lg w-fit m-auto items-center">
      <h1 className="text-lg font-semibold p-0 m-0">
        {selectedItems.length} items are selected
      </h1>
      <button className="bg-hover text-black font-semibold py-2 px-2 rounded hover:bg-white mr-2 ml-5">
        Unselect all
      </button>
      <button className="bg-hover text-black py-2 font-semibold px-2 rounded hover:bg-green-700 hover:bg-white">
        Download
      </button>
    </div>
  );
};

export default ModalMenu;
