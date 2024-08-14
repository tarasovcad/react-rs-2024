import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchContext } from '~/contexts/SearchContext';
import Cookies from 'js-cookie';
import Search from '~/components/Search';
import { Props } from '~/types/types';

// Mock useNavigate from Remix
vi.mock('@remix-run/react', () => ({
  useNavigate: () => vi.fn(),
}));

// Mock useLocalStorage hook
vi.mock('~/hooks/useLocalStorage', () => ({
  default: () => ['', vi.fn(), vi.fn()],
}));

describe('Search Component', () => {
  const setTerm = vi.fn();
  const setCurrentPage = vi.fn();

  const MockSearchContext = ({ children }: Props) => (
    <SearchContext.Provider value={{ setTerm, setCurrentPage }}>{children}</SearchContext.Provider>
  );

  it('renders search input and button', () => {
    render(
      <MockSearchContext>
        <Search />
      </MockSearchContext>,
    );
    expect(screen.getByPlaceholderText('Search character....')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls handleSubmit on button click', () => {
    render(
      <MockSearchContext>
        <Search />
      </MockSearchContext>,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(setTerm).toHaveBeenCalled();
    expect(setCurrentPage).toHaveBeenCalledWith(1);
    expect(Cookies.get('tarasovcadCookieAppRemix')).toBeDefined();
  });

  it('calls handleSubmit on Enter key press', () => {
    render(
      <MockSearchContext>
        <Search />
      </MockSearchContext>,
    );
    const input = screen.getByPlaceholderText('Search character....');
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(setTerm).toHaveBeenCalled();
    expect(setCurrentPage).toHaveBeenCalledWith(1);
    expect(Cookies.get('tarasovcadCookieAppRemix')).toBeDefined();
  });
});
