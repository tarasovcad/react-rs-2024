import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import Main from '~/components/Main';
import { CharactersResponse } from '~/types/types';
import * as cookie from 'cookie';

export const loader: LoaderFunction = async ({ params, request }) => {
  // get cookie from request
  const cookieHeader = request.headers.get('Cookie');
  const cookies = cookie.parse(cookieHeader || '');
  const term = cookies['tarasovcadCookieAppRemix'] || '';

  const url = new URL(request.url);
  const currentPage = Number(params.page) || '1';
  const details = url.searchParams.get('details') || '0';
  const apiUrl = `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${term}`;

  try {
    const response = await fetch(apiUrl);
    const data: CharactersResponse = await response.json();

    return json({
      currentPage,
      details,
      characters: data,
      notFound: data.results.length === 0,
      totalPages: data.info.pages,
      term,
      isLoading: false,
      detailedcardID: Number(url.searchParams.get('details')),
    });
  } catch (error) {
    return json({
      currentPage,
      details,
      characters: null,
      notFound: true,
      totalPages: 0,
      term,
      isLoading: false,
      detailedcardID: undefined,
    });
  }
};

export default function App() {
  const {
    details,
    characters,
    notFound,
    totalPages,
    isLoading,
    term,
    detailedcardID,
    currentPage,
  } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const isDetailsOpen = Boolean(Number(details) || false);

  const hideDetailedCard = () => {
    searchParams.set('details', '0');
    setSearchParams(searchParams);
  };

  const handlePageClick = (id: number) => {
    searchParams.set('details', id.toString());
    setSearchParams(searchParams);
  };
  return (
    <Main
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
