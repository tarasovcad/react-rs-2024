import {Inter} from "next/font/google";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {Character, CharactersResponse, MainProps} from "@/types/types";
import {useRouter} from "next/router";
import Loader from "@/components/loader/Loader";
import SingleCharacter from "@/components/SingleCharacter";
import Pagination from "@/components/Pagination";
import DetailedCard from "@/components/DetailedCard";
import ModalMenu from "@/components/redux/ModalMenu";
import {GetServerSideProps} from "next";

const inter = Inter({subsets: ["latin"]});

export default function Main({
  characters,
  notFound,
  totalPages,
  initialTerm,
}: MainProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const [detailedcardID, setDetailedcardID] = useState<number>();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  function handlePageClick(id: number) {
    setDetailedcardID(id);
    router.push({
      pathname: router.pathname,
      query: {...router.query, details: "1"},
    });
  }
  const isDetailsOpen = Boolean(Number(searchParams.get("details"))) || false;

  useEffect(() => {
    const handleRouteChangeStart = () => setIsLoading(true);
    const handleRouteChangeComplete = () => setIsLoading(false);
    const handleRouteChangeError = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);
  return (
    <main className={` ${inter.className}`}>
      <div className="container">
        <h1
          className="characters mb-[4px] mt-[50px]"
          data-testid="main-heading">
          {initialTerm ? `Search results for: ${initialTerm}` : "Characters"}
        </h1>
        <h2 className="description mb-[45px]">
          All of the characters that appear in the
          <a
            href="https://rickandmorty.fandom.com/wiki/Rickipedia"
            target="_blank"
            rel="noreferrer">
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
                      query: {...router.query, details: "0"},
                    });
                  }}
                />
              </div>
            )}
            <ModalMenu />
          </>
        )}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {query} = context;
  const {cookies} = context.req;
  const currentPage = Number(query.page) || 1;

  let cookieTerm = cookies["tarasovcadCookie"];
  let term = "";
  if (cookieTerm) {
    term = cookieTerm;
  }
  if (!cookieTerm) {
    cookieTerm = "";
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
      },
    };
  }
};
