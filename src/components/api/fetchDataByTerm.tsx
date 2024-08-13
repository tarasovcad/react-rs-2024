import {CharactersResponse} from "@/types/types";

export async function fetchDataByTerm(
  term: string,
  currentPage: number,
): Promise<CharactersResponse | false> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${term}&page=${currentPage}`,
  );

  if (!response.ok) {
    console.log(`Failed to fetch characters (status ${response.status})`);
    return false;
  }

  return response.json();
}
