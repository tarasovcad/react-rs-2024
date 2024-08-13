import { Character, MainProps } from '~/types/types';
import Loader from './loader/Loader';
import SingleCharacter from './SingleCharacter';
import ModalMenu from './redux/ModalMenu';
import Pagination from './Pagination';
import DetailedCard from './DetailedCard';

export default function Main({
  setCurrentPage,
  term,
  currentPage,
  characters,
  totalPages,
  detailedcardID,
  isLoading,
  notFound,
  isDetailsOpen,
  handlePageClick,
  hideDetailedCard,
}: MainProps) {
  return (
    <main>
      <div className="container">
        <h1 className="characters mb-[4px] mt-[50px]" data-testid="main-heading">
          {term ? `Search results for: ${term}` : 'Characters'}
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
              <div data-testid="grid-container" className={'grid-container'}>
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
                <DetailedCard detailedcardID={detailedcardID} hideDetailedCard={hideDetailedCard} />
              </div>
            )}
            <ModalMenu />
          </>
        )}
      </div>
    </main>
  );
}
