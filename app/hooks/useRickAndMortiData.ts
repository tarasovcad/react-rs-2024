"use client";
import { useEffect, useState } from "react";
import type { Character, CharactersResponse } from "../types/types";
import {
  useFetchDataByIDQuery,
  useFetchDataByTermQuery,
} from "./../store/rickAndMorti";

export const useFetchDataByTerm = (term: string, currentPage: number) => {
  const [characters, setCharacters] = useState<CharactersResponse | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { data, error, isFetching } = useFetchDataByTermQuery({
    term,
    currentPage,
  });

  useEffect(() => {
    setIsLoading(isFetching);
    if (data) {
      if (data.results.length === 0) {
        setNotFound(true);
      } else {
        setTotalPages(data.info.pages);
        setCharacters(data);
        setNotFound(false);
      }
      setIsLoading(false);
    }
    if (error) {
      setIsLoading(false);
      setNotFound(true);
    }
  }, [term, currentPage, data, error, isFetching]);

  return { characters, notFound, totalPages, isLoading };
};

export const useFetchDataByID = (detailedcardID: number) => {
  const [detailedCardData, setDetailedCardData] = useState<Character | null>(
    null
  );
  const [isDetailedcardLoading, setIsDetailedcardLoading] = useState(false);

  const { data, error, isFetching } = useFetchDataByIDQuery(detailedcardID);

  useEffect(() => {
    setIsDetailedcardLoading(isFetching);
    if (data) {
      setDetailedCardData(data);
    }
  }, [detailedcardID, data, error, isFetching]);

  return { isDetailedcardLoading, detailedCardData };
};
