import React, { useState } from 'react';
import { SearchContext } from '../contexts/SearchContext';

interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [term, setTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <SearchContext.Provider value={{ setTerm, setCurrentPage }}>{children}</SearchContext.Provider>
  );
};
