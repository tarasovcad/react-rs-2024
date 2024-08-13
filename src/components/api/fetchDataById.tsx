import {type Character} from "@/types/types";

export async function fetchDataById(
  detailedcardID: number,
): Promise<Character | false> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${detailedcardID}`,
  );
  if (!response.ok) {
    console.log(`Failed to fetch characters (status ${response.status})`);
    return false;
  }

  return response.json();
}
