import React, {useState} from "react";
import {FetchDataByID} from "../api/fetchData";
import LoaderDetailedCard from "./LoaderDetailedCard";
import {type Character, DetailedCardpProps} from "../types/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {addItem, removeItem} from "./../store/slices/selectedDataSlice";

const DetailedCard = ({
  detailedcardID,
  isDetailedcardLoading,
  detailedcardLoading,
  hideDetailedCard,
}: DetailedCardpProps) => {
  const [detailedCardData, setDetailedCardData] = useState<Character | null>(
    null,
  );

  const {name, status, gender, species, image, id} = detailedCardData ?? {};

  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedData.selectedItems,
  );

  const handleCheckboxChange = () => {
    if (selectedItems.some((item) => item.id === id)) {
      dispatch(removeItem(detailedCardData));
    } else {
      dispatch(addItem(detailedCardData));
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      hideDetailedCard();
    }
  };
  return (
    <div className="detailedcard-overlay" onClick={handleOverlayClick}>
      <div className="detailed-card__container">
        {detailedcardLoading ? (
          <LoaderDetailedCard />
        ) : (
          <>
            <div
              className="close cursor-pointer"
              onClick={hideDetailedCard}></div>
            <img src={image} alt="Image" loading="lazy" />
            <h1>{name}</h1>
            <h2>
              Status: <span>{status}</span>
            </h2>
            <h2>
              Species: <span>{species}</span>
            </h2>
            <h2>
              Gender: <span>{gender}</span>
            </h2>
            <div className="flex">
              <input
                type="checkbox"
                className="checkbox__detailed"
                onChange={handleCheckboxChange}
                checked={selectedItems.some((item) => item.id === id)} // if the item is in the selectedItems array, it will be checked
              />
              <label className="label">Add to selection</label>
            </div>
          </>
        )}
      </div>
      <FetchDataByID
        isDetailedcardLoading={isDetailedcardLoading}
        detailedcardID={detailedcardID}
        setDetailedCardData={setDetailedCardData}
      />
    </div>
  );
};

export default DetailedCard;
