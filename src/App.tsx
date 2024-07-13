import React, {createContext, useState} from "react";
import {useEffect} from "react";
import SingleCharacter from "./components/SingleCharacter";
import Loader from "./components/Loader";
import {type Character, GlobalContent} from "./types/types";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import {FetchDataByTerm} from "./api/fetchData";

export const SearchContext = createContext<GlobalContent>({
  term: "",
  setTerm: () => {},
});

const App = () => {
  const [loading, isLoading] = useState(false);
  const [term, setTerm] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const items = JSON.parse(
      localStorage.getItem("tarasovcadLocalStorage") || "{}",
    );
    if (items) {
      setTerm(items);
    }
  }, []);

  return (
    <SearchContext.Provider value={{term, setTerm}}>
      <div className="container">
        <Navbar />
        {/* Need to fix */}
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
            <div className="grid-container mt-10">
              {characters &&
                characters.map((character: Character) => {
                  return (
                    <SingleCharacter key={character.id} character={character} />
                  );
                })}
            </div>
            <Pagination />
          </>
        )}
        <FetchDataByTerm
          term={term}
          isLoading={isLoading}
          setNotFound={setNotFound}
          setCharacters={setCharacters}
          setTerm={setTerm}
        />
      </div>
    </SearchContext.Provider>
  );
};

export default App;
