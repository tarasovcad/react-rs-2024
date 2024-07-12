import React, {useState} from "react";
import {useEffect} from "react";
import SingleCharacter from "./components/SingleCharacter";
import Loader from "./components/Loader";
import {Character} from "./types/types";
const App = () => {
  const [loading, isLoading] = useState(false);
  //const [term, setTerm] = useState("");
  const term = "";
  const [notFound, setNotFound] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    isLoading(true);
    fetch(`https://rickandmortyapi.com/api/character/?name=${term}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong...");
        }
        return response.json();
      })
      .then((data) => {
        if (data.results.length === 0) {
          setNotFound(true);
        }
        setCharacters(data.results);
        isLoading(false);
      })
      .catch(() => {
        isLoading(false);
        setNotFound(true);
      });
  }, []);
  return (
    <div className="container">
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
        <div className="grid-container mt-10">
          {characters &&
            characters.map((character: Character) => {
              return (
                <SingleCharacter key={character.id} character={character} />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default App;
