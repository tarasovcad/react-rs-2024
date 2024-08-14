import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '~/components/Navbar';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '~/store';
import { SearchContext } from '~/contexts/SearchContext';

describe('Navbar Component', () => {
  it('renders the logo and error button', () => {
    const setTerm = vi.fn();
    const setCurrentPage = vi.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchContext.Provider value={{ setTerm, setCurrentPage }}>
            <Navbar />
          </SearchContext.Provider>
        </MemoryRouter>
      </Provider>,
    );

    // Check if the logo is rendered
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();

    // Check if the error button is rendered
    const errorButton = screen.getByText('Throw error');
    expect(errorButton).toBeInTheDocument();
  });

  it('throws an error when the error button is clicked', () => {
    const setTerm = vi.fn();
    const setCurrentPage = vi.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchContext.Provider value={{ setTerm, setCurrentPage }}>
            <Navbar />
          </SearchContext.Provider>
        </MemoryRouter>
      </Provider>,
    );

    // Click the error button
    const errorButton = screen.getByText('Throw error');
    expect(() => {
      fireEvent.click(errorButton);
    }).toThrow('This is a test error');
  });
});
