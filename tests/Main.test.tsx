import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from '~/components/Main';
import { Provider } from 'react-redux';
import { store } from '~/store';
import { MemoryRouter } from 'react-router-dom';
describe('Main Component', () => {
  const defaultProps = {
    term: '',
    currentPage: 1,
    characters: {
      info: {
        pages: 1,
      },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          species: 'Human',
          image: 'https://example.com/images/rick.jpg',
        },
        {
          id: 2,
          name: 'Morty Smith',
          species: 'Human',
          image: 'https://example.com/images/morty.jpg',
        },
      ],
    },
    totalPages: 1,
    detailedcardID: null,
    isLoading: false,
    notFound: false,
    isDetailsOpen: false,
    handlePageClick: vi.fn(),
    hideDetailedCard: vi.fn(),
  };

  it('renders the main heading', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main {...defaultProps} />
        </MemoryRouter>
      </Provider>,
    );
    const heading = screen.getByTestId('main-heading');
    expect(heading).toHaveTextContent('Characters');
  });

  it('displays search term in the heading when term is provided', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main {...defaultProps} term="Rick" />
        </MemoryRouter>
      </Provider>,
    );
    const heading = screen.getByTestId('main-heading');
    expect(heading).toHaveTextContent('Search results for: Rick');
  });

  it('shows the loader when isLoading is true', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main {...defaultProps} isLoading={true} />
        </MemoryRouter>
      </Provider>,
    );
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('displays not found message when notFound is true', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main {...defaultProps} notFound={true} />
        </MemoryRouter>
      </Provider>,
    );

    const notFoundMessage = screen.getByTestId('not-found');
    expect(notFoundMessage).toHaveTextContent('No characters found :(');
  });

  it('renders characters when available', () => {
    const characters = {
      info: {
        pages: 1,
      },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          species: 'Human',
          image: 'https://example.com/images/rick.jpg',
        },
        {
          id: 2,
          name: 'Morty Smith',
          species: 'Human',
          image: 'https://example.com/images/morty.jpg',
        },
      ],
    };
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main {...defaultProps} characters={characters} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('character-1')).toBeInTheDocument();
    expect(screen.getByTestId('character-2')).toBeInTheDocument();
  });

  it('renders DetailedCard when isDetailsOpen is true and detailedcardID is provided', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main {...defaultProps} isDetailsOpen={true} detailedcardID={1} />
        </MemoryRouter>
      </Provider>,
    );
    const detailedCard = screen.getByTestId('detailed-card');
    expect(detailedCard).toBeInTheDocument();
  });
});
