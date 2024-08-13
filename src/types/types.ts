import {ReactNode} from "react";

export interface Character {
  id?: number;
  name?: string;
  image?: string;
  status?: string;
  gender?: string;
  species?: string;
}

export interface CharacterArray {
  characters: {
    results: Character[];
  };
}

export interface Props {
  children?: ReactNode;
}

export interface SingleState {
  character: Character;
  handlePageClick: (id: number) => void;
}

export interface SingleProps {
  character: Character;
}

export interface SearchState {
  term: string;
}
export interface NavbarState {
  term: string;
  shouldThrowError: boolean;
}

export interface SearchProps {
  // the function that doesn't return anything
  onSearchChange: (term: string) => void;
}

export type GlobalContent = {
  setTerm: (c: string) => void;
  setCurrentPage: (currentPage: number) => void;
};

export interface FetchDataByTermProps {
  term: string;
  setTerm: (term: string) => void;
  setNotFound: (notFound: boolean) => void;
  isLoading: (loading: boolean) => void;
  setCharacters: (characters: {results: []}) => void;
  setTotalPages: (totalPages: number) => void;
  currentPage: number;
}
export interface FetchDataByIDProps {
  isDetailedcardLoading?: boolean | ((detailedcardLoading: boolean) => void);
  detailedcardID: number;
  setDetailedCardData: (characters: Character) => void;
}

export interface DetailedCardpProps {
  detailedcardID: number;
  hideDetailedCard: () => void;
}
export interface DetailedCardpProps3 {
  isDetailedcardLoading: boolean;
  detailedcardID: number;
  detailedcardLoading: boolean;
  hideDetailedCard: () => void;
}

export type ParamTypes = {
  page: string | undefined;
};

export interface CharactersData {
  results: Character[];
}
export interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export interface DetailedCardData {
  detailedCardData: Character[];
}
export interface CharacterResult {
  id: number;
  name: string;
}

export interface ApiResponse {
  results: CharacterResult[];
  info: {pages: number};
}

export interface SingleCharacterResponse {
  id: number;
  name: string;
  status: string;
  species: string;
}

export interface SelectedDataState {
  selectedItems: Character[];
}

export interface ExportCSVProps {
  data: Character[];
  fileName: string;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme?: () => void;
}

export type CharactersResponse = {
  info: {
    pages: number;
  };
  results: Character[];
};
export type CharactersWResult = {
  results: Character[];
};

export interface MainProps {
  term: string;
  currentPage: number;
  characters: CharactersResponse | null;
  totalPages: number;
  detailedcardID: number | null | undefined;
  isLoading: boolean;
  notFound: boolean;
  setCurrentPage: (currentPage: number) => void;
  isDetailsOpen: boolean;
  hideDetailedCard: () => void;
  handlePageClick: (id: number) => void;
}

export interface RootState {
  selectedData: SelectedDataState;
}

export interface PageProps {
  params: {
    search: number;
  };
  searchParams: {
    page?: string;
    term?: string;
    details?: string;
  };
}

export interface MainPageProps {
  searchParams?: {
    page?: string;
    term?: string;
    details?: string;
  };
  characters: CharactersWResult | false;
  totalPages: number;
  currentPage: number;
  term: string;
  detailedcardID: number | undefined;
  hideDetailedCard: () => void;
  handlePageClick: (id: number) => void;
  isDetailsOpen: boolean;
  notFound: boolean;
}

export function isCharactersWResult(
  characters: CharactersWResult | false,
): characters is CharactersWResult {
  return characters !== false && "results" in characters;
}
