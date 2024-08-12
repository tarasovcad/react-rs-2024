import { GlobalContent } from '@/types/types';
import { createContext } from 'react';



export const SearchContext = createContext<GlobalContent>({
  setTerm: () => {},
  setCurrentPage: () => {},
});
