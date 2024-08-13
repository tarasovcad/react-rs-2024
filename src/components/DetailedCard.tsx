import React, {useEffect, useState} from "react";
import {Character, type DetailedCardpProps} from "../types/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {addItem, removeItem} from "./../store/slices/selectedDataSlice";
import LoaderDetailedCard from "./loader/LoaderDetailedCard";
import Image from "next/image";

const DetailedCard = ({
  detailedcardID,
  hideDetailedCard,
}: DetailedCardpProps) => {
  const [detailedCardData, setDetailedCardData] = useState<Character | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const {name, status, gender, species, image, id} = detailedCardData ?? {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${detailedcardID}`,
        );
        const data = await response.json();
        setDetailedCardData(data);
      } catch (error) {
        console.error("Error fetching detailed card data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [detailedcardID]);

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
        {isLoading ? (
          <LoaderDetailedCard />
        ) : (
          <>
            <div
              className="close cursor-pointer"
              onClick={hideDetailedCard}></div>
            <Image
              src={image || "/images/18.jpeg"}
              alt="Image"
              loading="lazy"
              width={65}
              height={65}
              style={{width: "100%", height: "auto"}}
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
