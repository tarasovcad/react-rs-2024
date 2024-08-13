/* eslint-disable */
import {Inter} from "next/font/google";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {Character, CharactersResponse} from "@/types/types";
import {useRouter} from "next/router";
import Loader from "@/components/loader/Loader";
import SingleCharacter from "@/components/SingleCharacter";
import Pagination from "@/components/Pagination";
import DetailedCard from "@/components/DetailedCard";
import ModalMenu from "@/components/redux/ModalMenu";
import {GetServerSideProps} from "next";
import {getCookie} from "cookies-next";

const inter = Inter({subsets: ["latin"]});

interface MainProps {
  characters: CharactersResponse | null;
  notFound: boolean;
  totalPages: number;
  isLoading: boolean;
  initialTerm: string;
  initialPage: number;
}

export default function Main({
  characters,
  notFound,
  totalPages,
  isLoading,
  initialTerm,
  initialPage,
}: MainProps) {
  const [term, setTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const [detailedcardID, setDetailedcardID] = useState<number>();
  const router = useRouter();

  // useEffect(() => {
  //   if (searchParams.size > 0) {
  //     setCurrentPage(Number(searchParams));
  //   } else {
  //     router.push(`/search/${currentPage}`);
  //   }
  //   const items = JSON.parse(
  //     localStorage.getItem("tarasovcadLocalStorage") || "{}",
  //   );
  //   if (items) {
  //     setTerm(items);
  //   }
  // }, [currentPage, router, isLoading, searchParams]);

  function handlePageClick(id: number) {
    setDetailedcardID(id);
    router.push({
      pathname: router.pathname,
      query: {...router.query, details: "1"},
    });
  }
  const isDetailsOpen = Boolean(Number(searchParams.get("details"))) || false;

  return (
    <main className={` ${inter.className}`}>
      {/* <div className="container">
        <h1
          className="characters mb-[4px] mt-[50px]"
          data-testid="main-heading"
        >
          {term ? `Search results for: ${term}` : "Characters"}
        </h1>
        <h2 className="description mb-[45px]">
          All of the characters that appear in the
          <a
            href="https://rickandmorty.fandom.com/wiki/Rickipedia"
            target="_blank"
            rel="noreferrer"
          >
            <em> Rick and Morty </em>
          </a>
          franchise.
        </h2>
        {isLoading && (
          <div data-testid="loader">
            <Loader />
          </div>
        )}
        {notFound === true ? (
          <h2 data-testid="not-found">No characters found :(</h2>
        ) : (
          <>
            <div className="flex mt-10">
              <div data-testid="grid-container" className={"grid-container"}>
                {characters?.results &&
                  characters.results.map((character: Character) => {
                    return (
                      <SingleCharacter
                        key={character.id}
                        character={character}
                        handlePageClick={handlePageClick}
                        data-testid={`character-${character.id}`}
                      />
                    );
                  })}
              </div>
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            {isDetailsOpen && detailedcardID && (
              <div data-testid="detailed-card">
                <DetailedCard
                  detailedcardID={detailedcardID}
                  hideDetailedCard={() => {
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query, details: "0" },
                    });
                  }}
                />
              </div>
            )}
            <ModalMenu />
          </>
        )}
      </div> */}
      <h1>{initialPage}</h1>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {query} = context;
  const {cookies} = context.req;
  const currentPage = Number(query.page) || 1;

  const cookieTerm = cookies["tarasovcadCookie"];
  let term = "";
  if (cookieTerm) {
    term = cookieTerm;
  }
  if (!cookieTerm) {
    console.log("Cookie is undefined");
  }
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${term}&page=${currentPage}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CharactersResponse = await response.json();

    if (!data || !data.results) {
      throw new Error("Invalid response structure");
    }
    if (data.results.length === 0) {
      return {
        props: {
          characters: null,
          notFound: true,
          totalPages: 0,
          isLoading: false,
          initialTerm: term,
          initialPage: currentPage,
        },
      };
    }

    return {
      props: {
        characters: data,
        notFound: false,
        totalPages: data.info.pages,
        isLoading: false,
        initialTerm: term,
        initialPage: currentPage,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        characters: null,
        notFound: true,
        totalPages: 0,
        isLoading: false,
        initialTerm: term,
        initialPage: currentPage,
      },
    };
  }
};
