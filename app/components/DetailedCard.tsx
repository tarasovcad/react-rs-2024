import React, { useEffect, useState } from 'react';
import { Character, type DetailedCardpProps } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addItem, removeItem } from './../store/slices/selectedDataSlice';
import LoaderDetailedCard from './loader/LoaderDetailedCard';

const DetailedCard = ({ hideDetailedCard, detailedcardID }: DetailedCardpProps) => {
  const [detailedCardData, setDetailedCardData] = useState<Character | null>(null);
  const [isDetailedcardLoading, setIsDetailedcardLoading] = useState(true);
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedData.selectedItems);

  useEffect(() => {
    const fetchData = async () => {
      setIsDetailedcardLoading(true);
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${detailedcardID}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDetailedCardData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsDetailedcardLoading(false);
      }
    };

    fetchData();
  }, [detailedcardID]);

  const { name, status, gender, species, image, id } = detailedCardData ?? {};
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
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      hideDetailedCard();
    }
  };
  return (
    <div
      className="detailedcard-overlay"
      onClick={handleOverlayClick}
      data-testid="overlay"
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}>
      <div className="detailed-card__container">
        {isDetailedcardLoading ? (
          <LoaderDetailedCard />
        ) : (
          <>
            <div
              className="close cursor-pointer"
              onClick={hideDetailedCard}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  hideDetailedCard();
                }
              }}
              role="button"
              tabIndex={0}></div>
            <img
              src={image || ''}
              alt="Close"
              loading="lazy"
              width={65}
              height={65}
              style={{ width: '250px', height: '250px' }}
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
              <span className="label">Add to selection</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailedCard;
