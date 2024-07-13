import {useEffect} from "react";
import {type FetchDataByTermProps} from "../types/types";

export const FetchDataByTerm = ({
  isLoading,
  setNotFound,
  setCharacters,
  //setTerm,
  term,
}: FetchDataByTermProps) => {
  useEffect(() => {
    isLoading(true);
    fetch(`https://rickandmortyapi.com/api/character/?name=${term}`)
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
        setCharacters(data.results);
        setNotFound(false);
        isLoading(false);
      })
      .catch(() => {
        isLoading(false);
        setNotFound(true);
      });
  }, [term]);
  return null;
};
