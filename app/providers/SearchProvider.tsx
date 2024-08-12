import React, { useState } from 'react';
import { SearchContext } from '~/contexts/SearchContext';

interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [term, setTerm] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <SearchContext.Provider value={{ setTerm, setCurrentPage }}>{children}</SearchContext.Provider>
  );
};
