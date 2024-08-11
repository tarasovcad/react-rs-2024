"use client";
import { useFetchDataByTerm } from "./../hooks/useRickAndMortiData";
import React from "react";
import Main from "./Main";

export default function App({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    term?: string;
    details?: string;
  };
}) {
  const term = searchParams?.term || "";
  const currentPage = Number(searchParams?.page) || 1;
  const detailedCardId = Number(searchParams?.details) || undefined;
  const { characters, notFound, totalPages, isLoading } = useFetchDataByTerm(
    term,
    currentPage,
  );
  return (
    <Main
      term={term}
      currentPage={currentPage}
      characters={characters}
      totalPages={totalPages}
      detailedCardId={detailedCardId}
      isLoading={isLoading}
      notFound={notFound}
    />
  );
}
