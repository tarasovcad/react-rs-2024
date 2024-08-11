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
  const [currentPage, setCurrentPage] = useState(0);
  const [term, setTerm] = useState("");
  const detailedCardId = Number(searchParams?.details) || undefined;
  const { characters, notFound, totalPages, isLoading } = useFetchDataByTerm(
    term,
    currentPage,
  );

  useEffect(() => {
    console.log(search, "params");
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
  }, []);
  return (
    <Main
      setCurrentPage={setCurrentPage}
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
