import React from "react";
import {type DetailedCardpProps} from "../types/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {addItem, removeItem} from "./../store/slices/selectedDataSlice";
import LoaderDetailedCard from "./loader/LoaderDetailedCard";
import {FetchDataByID} from "@/hooks/useRickAndMortiData";
import Image from "next/image";

const DetailedCard = ({
  detailedcardID,
  hideDetailedCard,
}: DetailedCardpProps) => {
  const {isDetailedcardLoading, detailedCardData} =
    FetchDataByID(detailedcardID);

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
    <div
      className="detailedcard-overlay"
      onClick={handleOverlayClick}
      data-testid="overlay">
      <div className="detailed-card__container">
        {isDetailedcardLoading ? (
          <LoaderDetailedCard />
        ) : (
          <>
            <div
              className="close cursor-pointer"
              onClick={hideDetailedCard}></div>
            <Image
              src={image || ""}
              alt="Image"
              loading="lazy"
              width={65}
              height={65}
              unoptimized
            />
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
    </div>
  );
};

export default DetailedCard;
