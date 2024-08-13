import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "~/store/slices/selectedDataSlice";
import { RootState, SingleState } from "~/types/types";

const SingleCharacter: React.FC<SingleState> = ({
  character,
  handlePageClick,
}) => {
  const { name, image, id } = character;
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedData.selectedItems
  );
  const handleCheckboxChange = () => {
    if (selectedItems.some((item) => item.id === id)) {
      dispatch(removeItem(character));
    } else {
      dispatch(addItem(character));
    }
  };
  return (
    <div className="flex flex-col cursor-pointer relative">
      <input
        type="checkbox"
        className="checkbox"
        onChange={handleCheckboxChange}
        checked={selectedItems.some((item) => item.id === id)} // if the item is in the selectedItems array, it will be checked
      />
      <div
        onClick={() => handlePageClick(id!)}
        data-testid={`character-${id}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handlePageClick(id!);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <img src={image || ""} alt={name || "Photo"} width={300} height={300} />
        <h2 className="mt-[12px] text-lg" data-testid="character-name">
          {name}
        </h2>
      </div>
    </div>
  );
};

export default SingleCharacter;
