import React, {createContext, useState} from "react";
import {useEffect} from "react";
import SingleCharacter from "./components/SingleCharacter";
import Loader from "./components/Loader";
import {
  type Character,
  CharactersData,
  GlobalContent,
  ParamTypes,
} from "./types/types";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import {FetchDataByTerm} from "./api/fetchData";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import DetailedCard from "./components/DetailedCard";

export const SearchContext = createContext<GlobalContent>({
  setTerm: () => {},
  setCurrentPage: () => {},
});

const App = () => {
  const [loading, isLoading] = useState(false);
  const [term, setTerm] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [characters, setCharacters] = useState<CharactersData>({results: []});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [detailedcardID, setDetailedcardID] = useState<number>();
  const [detailedcardLoading, isDetailedcardLoading] = useState(false);
  const {page} = useParams<ParamTypes>();
  const navigate = useNavigate();

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    } else {
      navigate(`/search/${currentPage}`);
    }

    const items = JSON.parse(
      localStorage.getItem("tarasovcadLocalStorage") || "{}",
    );
    if (items) {
      setTerm(items);
    }
  }, []);
  function handlePageClick(id: number) {
    setDetailedcardID(id);
    setSearchParams((params) => {
      params.set("details", "1");
      return params;
    });
  }
  const isDetailsOpen = Boolean(Number(searchParams.get("details"))) || false;
  return (
    <SearchContext.Provider value={{setTerm, setCurrentPage}}>
      <div className="container">
        <Navbar />

        <h1 className="characters mb-[4px] mt-[50px]">
          {term ? `Search results for: ${term}` : "Characters"}
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

        {loading && <Loader />}

        {notFound === true ? (
          <h2>No characters found :(</h2>
        ) : (
          <>
            <div className="flex mt-10">
              <div
                className={
                  searchParams.size === 1
                    ? "grid-container-with-detailedcard"
                    : "grid-container"
                }>
                {characters.results &&
                  characters.results.map((character: Character) => {
                    return (
                      <SingleCharacter
                        key={character.id}
                        character={character}
                        handlePageClick={handlePageClick}
                      />
                    );
                  })}
              </div>
              {/* {searchParams.size === 1 && detailedcardID && ( */}
              {isDetailsOpen && detailedcardID && (
                <DetailedCard
                  detailedcardID={detailedcardID}
                  isDetailedcardLoading={isDetailedcardLoading}
                  detailedcardLoading={detailedcardLoading}
                  hideDetailedCard={() => {
                    setSearchParams((params) => {
                      params.set("details", "0");
                      return params;
                    });
                  }}
                />
              )}
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
        <FetchDataByTerm
          term={term}
          isLoading={isLoading}
          setNotFound={setNotFound}
          setCharacters={setCharacters}
          setTerm={setTerm}
          setTotalPages={setTotalPages}
          currentPage={currentPage}
        />
      </div>
    </SearchContext.Provider>
  );
};

export default App;
