export interface Character {
  id: number;
  name: string;
  image: string;
}
export interface AppState {
  characters: {
    results: Character[];
  };
  isLoading: boolean;
  notFound: boolean;
  searchTerm: string;
}

export interface SingleState {
  character: Character;
}

export interface SingleProps {
  character: Character;
}

export interface SearchState {
  term: string;
}
