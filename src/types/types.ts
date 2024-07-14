export interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  gender: string;
  species: string;
}

export interface CharacterArray {
  characters: {
    results: Character[];
  };
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
  isDetailedcardLoading: (detailedcardLoading: boolean) => void;
  detailedcardID: number;
  setDetailedCardData: (characters: Character) => void;
}

export interface DetailedCardpProps {
  isDetailedcardLoading: (detailedcardLoading: boolean) => void;
  detailedcardID: number;
  detailedcardLoading: boolean;
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
  setCurrentPage: (currentPage: number) => void;
}

export interface DetailedCardData {
  detailedCardData: Character[];
}
