import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Character, CharactersData, ParamTypes } from '@/types/types';
import { useRouter } from 'next/router';
import Loader from './loader/Loader';
import SingleCharacter from './SingleCharacter';
import { FetchDataByTerm } from '@/hooks/useRickAndMortiData';
import ModalMenu from './redux/ModalMenu';
import Pagination from './Pagination';
import DetailedCard from './DetailedCard';

const inter = Inter({ subsets: ['latin'] });

export default function Main() {
  const [term, setTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const [detailedcardID, setDetailedcardID] = useState<number>();
  const { characters, notFound, totalPages, isLoading } = FetchDataByTerm(term, currentPage);
  const router = useRouter();
  
  useEffect(() => {
    if (searchParams.size > 0) {
      setCurrentPage(Number(searchParams));
    } else {
      router.push(`/search/${currentPage}`);
    }
    const items = JSON.parse(localStorage.getItem('tarasovcadLocalStorage') || '{}');
    if (items) {
      setTerm(items);
    }
  }, []);
  function handlePageClick(id: number) {
    setDetailedcardID(id);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, details: '1' },
    });
  }
  const isDetailsOpen = Boolean(Number(searchParams.get('details'))) || false;
  return (
    <main className={` ${inter.className}`}>
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
                <DetailedCard
                  detailedcardID={detailedcardID}
                  hideDetailedCard={() => {
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query, details: '0' },
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
