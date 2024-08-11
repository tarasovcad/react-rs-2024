// SearchProvider.test.tsx
import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { SearchContext } from '@/contexts/SearchContext';
import { SearchProvider } from '@/providers/SearchProvider';

// A simple component to test the context
const TestComponent: React.FC = () => {
  const { setTerm, setCurrentPage } = useContext(SearchContext);

  // Dummy functions to simulate context usage
  setTerm('test');
  setCurrentPage(2);

  return <div>Test Component</div>;
};

describe('SearchProvider', () => {
  it('provides setTerm and setCurrentPage functions to children', () => {
    const { getByText } = render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    // Check if the component rendered correctly
    expect(getByText('Test Component')).toBeInTheDocument();
  });
});