import {ReactNode} from "react";

export interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
}
export interface AppState {
  characters: {
    results: Character[];
  };
  isLoading: boolean;
  notFound: boolean;
  term: string;
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
export interface NavbarState {
  term: string;
  shouldThrowError: boolean;
}

export interface SearchProps {
  // the function that doesn't return anything
  onSearchChange: (term: string) => void;
}

export interface Props {
  children: ReactNode;
}
export type GlobalContent = {
  term: string;
  setTerm: (c: string) => void;
};
