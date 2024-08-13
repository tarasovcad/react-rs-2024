import {fetchDataByTerm} from "@/components/api/fetchDataByTerm";
import Loader from "@/components/loader/Loader";
import Main from "@/components/Main";
import React, {Suspense} from "react";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {PageProps} from "@/types/types";

const Page = async ({params, searchParams}: PageProps) => {
  const cookieStore = cookies();
  const term = cookieStore.get("tarasovcadCookieApp")?.value || "";
  const characters = await fetchDataByTerm(term, params.search);
  const currentPage = Number(params.search);
  const detailedcardID = Number(searchParams?.details) || undefined;

  let notFound = false;
  let totalPages = 1;

  if (characters === false) {
    notFound = true;
  } else {
    totalPages = characters.info?.pages;
  }
  async function hideDetailedCard() {
    "use server";
    const currentPath = `/search/${currentPage}`;
    const params = new URLSearchParams(searchParams);
    params.set("details", "0");
    const queryString = params.toString();
    redirect(`${currentPath}?${queryString}`);
  }

  async function handlePageClick(id: number) {
    "use server";
    const currentPath = `/search/${currentPage}`;
    const params = new URLSearchParams(searchParams);
    params.set("details", id.toString());
    const queryString = params.toString();
    redirect(`${currentPath}?${queryString}`);
  }

  const isDetailsOpen = Boolean(Number(searchParams?.details) || false);

  return (
    <Suspense fallback={<Loader />}>
      <Main
        isDetailsOpen={isDetailsOpen}
        term={term}
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={searchParams}
        characters={characters}
        hideDetailedCard={hideDetailedCard}
        handlePageClick={handlePageClick}
        detailedcardID={detailedcardID}
        notFound={notFound}
      />
    </Suspense>
  );
};

export default Page;
