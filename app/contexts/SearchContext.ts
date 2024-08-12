
import { createContext } from 'react';
import { GlobalContent } from '~/types/types';



export const SearchContext = createContext<GlobalContent>({
  setTerm: () => {},
  setCurrentPage: () => {},
});
