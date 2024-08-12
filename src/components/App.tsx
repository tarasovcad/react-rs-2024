"use client";
import { useFetchDataByTerm } from "./../hooks/useRickAndMortiData";
import React, { useEffect, useState } from "react";
import Main from "./Main";
import { useRouter } from "next/navigation";

export default function App({
  searchParams,
  search,
}: {
  searchParams?: {
    page?: string;
    term?: string;
    details?: string;
  };
  search: number;
}) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [term, setTerm] = useState("");
  const { characters, notFound, totalPages, isLoading } = useFetchDataByTerm(
    term,
    currentPage,
  );
  const [detailedcardID, setDetailedcardID] = useState<number>();
  const isDetailsOpen = Boolean(Number(searchParams?.details) || false);

  const hideDetailedCard = () => {
    const currentPath = `/search/${currentPage}`;
    const params = new URLSearchParams(searchParams);
    params.set("details", "0");
    const queryString = params.toString();
    router.push(`${currentPath}?${queryString}`);
  };

  const handlePageClick = (id: number) => {
    setDetailedcardID(id);
    const currentPath = `/search/${currentPage}`;
    const params = new URLSearchParams(searchParams);
    params.set("details", "1");
    const queryString = params.toString();
    router.push(`${currentPath}?${queryString}`);
  };
  useEffect(() => {
    if (search > 0) {
      setCurrentPage(Number(search));
    } else {
      router.push(`/search/${currentPage}`);
    }
    const items = JSON.parse(
      localStorage.getItem("tarasovcadLocalStorage") || "{}",
    );
    if (items) {
      setTerm(items);
    }
    console.log(isLoading, "isLoading");
  }, []);
  return (
    <Main
      setCurrentPage={setCurrentPage}
      term={term}
      currentPage={currentPage}
      characters={characters}
      totalPages={totalPages}
      detailedcardID={detailedcardID}
      isLoading={isLoading}
      notFound={notFound}
      isDetailsOpen={isDetailsOpen}
      handlePageClick={handlePageClick}
      hideDetailedCard={hideDetailedCard}
    />
  );
}
