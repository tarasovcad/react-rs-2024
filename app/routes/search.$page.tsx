import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData, useNavigate, useSearchParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import Main from '~/components/Main';
import { useFetchDataByTerm } from '~/hooks/useRickAndMortiData';

export const loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const page = params.page || '1';
  const details = url.searchParams.get('details') || '0';
  return json({ page, details });
};

export default function App() {
  const { page, details } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(Number(page));

  const [term, setTerm] = useState('');

  const { characters, notFound, totalPages, isLoading } = useFetchDataByTerm(term, currentPage);

  const [detailedcardID, setDetailedcardID] = useState<number>();

  const isDetailsOpen = Boolean(Number(details) || false);

  const hideDetailedCard = () => {
    searchParams.set('details', '0');
    setSearchParams(searchParams);
  };

  const handlePageClick = (id: number) => {
    setDetailedcardID(id);
    searchParams.set('details', '1');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (currentPage > 0) {
      navigate(`/search/${currentPage}?${searchParams.toString()}`);
    }

    const items = JSON.parse(localStorage.getItem('tarasovcadLocalStorage') || '{}');
    if (items) {
      setTerm(items);
    }
  }, [currentPage, navigate, searchParams]);

  return (
    <Main
      setCurrentPage={setCurrentPage}
      term={term}
      currentPage={currentPage}
      characters={characters}
      totalPages={totalPages}
      detailedcardID={detailedcardID}
      isLoading={isLoading}
      notFound={notFound}
      isDetailsOpen={isDetailsOpen}
      handlePageClick={handlePageClick}
      hideDetailedCard={hideDetailedCard}
    />
  );
}

{
  /* <Main
      setCurrentPage={setCurrentPage}
      term={term}
      currentPage={currentPage}
      characters={characters}
      totalPages={totalPages}
      detailedcardID={detailedcardID}
      isLoading={isLoading}
      notFound={notFound}
      isDetailsOpen={isDetailsOpen}
      handlePageClick={handlePageClick}
      hideDetailedCard={hideDetailedCard}
    /> */
}
