export interface Character {
  id: number;
  name: string;
  image: string;
}
export interface AppState {
  characters: {
    results: Character[];
  };
}

export interface SingleState {
  character: Character;
}

export interface SingleProps {
  character: Character;
}
