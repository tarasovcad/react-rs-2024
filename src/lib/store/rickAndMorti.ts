import { type Character, CharactersResponse } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rickAndMortyApi = createApi({
  reducerPath: "rickAndMortyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rickandmortyapi.com/api/",
  }),
  endpoints: (builder) => ({
    fetchDataByTerm: builder.query<
      CharactersResponse,
      { term: string; currentPage: number }
    >({
      query: ({ term, currentPage }) =>
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
