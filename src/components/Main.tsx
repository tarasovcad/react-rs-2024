import React from "react";
import Loader from "./loader/Loader";
import SingleCharacter from "./SingleCharacter";
import { Character, MainProps } from "@/types/types";
import ModalMenu from "./redux/ModalMenu";
import Pagination from "./Pagination";

export default function Main({
  setCurrentPage,
  term,
  currentPage,
  characters,
  totalPages,
  detailedCardId,
  isLoading,
  notFound,
}: MainProps) {
  console.log(detailedCardId);
  return (
    <main>
      <div className="container">
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
                        handlePageClick={() => {}}
                        data-testid={`character-${character.id}`}
                      />
                    );
                  })}
              </div>
            </div>
            <ModalMenu />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </main>
  );
}
