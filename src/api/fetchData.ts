import {useEffect} from "react";
import {type FetchDataByTermProps} from "../types/types";

export const FetchDataByTerm = ({
  isLoading,
  setNotFound,
  setCharacters,
  //setTerm,
  term,
  setTotalPages,
  currentPage,
}: FetchDataByTermProps) => {
  useEffect(() => {
    isLoading(true);
    fetch(
      `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${term}`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong...");
        }
        return response.json();
      })
      .then((data) => {
        if (data.results.length === 0) {
          setNotFound(true);
        }
        setTotalPages(data.info.pages);
        setCharacters(data);
        setNotFound(false);
        isLoading(false);
      })
      .catch(() => {
        isLoading(false);
        setNotFound(true);
      });
  }, [term, currentPage]);
  return null;
};
