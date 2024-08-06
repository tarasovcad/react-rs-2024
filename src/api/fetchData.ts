import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
  type Character,
  type FetchDataByIDProps,
  type FetchDataByTermProps,
  type CharactersResponse,
} from "../types/types";
import {useEffect} from "react";

export const rickAndMortyApi = createApi({
  reducerPath: "rickAndMortyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rickandmortyapi.com/api/",
  }),
  endpoints: (builder) => ({
    fetchDataByTerm: builder.query<
      CharactersResponse,
      {term: string; currentPage: number}
    >({
      query: ({term, currentPage}) =>
        `character/?page=${currentPage}&name=${term}`,
    }),
    fetchDataByID: builder.query<Character, number>({
      query: (detailedcardID) => `character/${detailedcardID}`,
    }),
  }),
});

export const {
  useFetchDataByTermQuery,
  useFetchDataByIDQuery,
}: {
  useFetchDataByTermQuery: CallableFunction;
  useFetchDataByIDQuery: CallableFunction;
} = rickAndMortyApi;

export const FetchDataByTerm = ({
  isLoading,
  setNotFound,
  setCharacters,
  term,
  setTotalPages,
  currentPage,
}: FetchDataByTermProps) => {
  const {data, error, isFetching} = useFetchDataByTermQuery({
    term,
    currentPage,
  });
  useEffect(() => {
    isLoading(isFetching);
    if (data) {
      if (data.results.length === 0) {
        setNotFound(true);
      }
      setTotalPages(data.info.pages);
      setCharacters(data);
      setNotFound(false);
      isLoading(false);
    }
    if (error) {
      isLoading(false);
      setNotFound(true);
    }
  }, [term, currentPage, data, error, isFetching]);
  return null;
};

export const FetchDataByID = ({
  isDetailedcardLoading,
  detailedcardID,
  setDetailedCardData,
}: FetchDataByIDProps) => {
  const {data, error, isFetching} = useFetchDataByIDQuery(detailedcardID);
  useEffect(() => {
    if (typeof isDetailedcardLoading === "function") {
      isDetailedcardLoading(isFetching);
    }
    if (data) {
      setDetailedCardData(data);
    }
  }, [detailedcardID, data, error, isFetching]);
  return null;
};
