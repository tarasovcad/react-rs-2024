import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import DetailedCard from '~/components/DetailedCard';
import { RootState } from '~/store';

const mockStore = configureStore<RootState>([]);

describe('DetailedCard Component', () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      selectedData: {
        selectedItems: [],
      },
    } as RootState);
    global.fetch = vi.fn();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders loader when loading', () => {
    render(
      <Provider store={store}>
        <DetailedCard hideDetailedCard={() => {}} detailedcardID={1} />
      </Provider>,
    );

    // Check if the loader is displayed
    const loader = screen.getByTestId('overlay');
    expect(loader).toBeInTheDocument();
  });

  test('displays character data after loading', async () => {
    const mockCharacterData = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      gender: 'Male',
      species: 'Human',
      image: 'https://example.com/image.jpg',
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockCharacterData),
    } as unknown as Response);

    render(
      <Provider store={store}>
        <DetailedCard hideDetailedCard={() => {}} detailedcardID={1} />
      </Provider>,
    );

    // Wait for the character data to be displayed
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText(/Status:/)).toHaveTextContent('Status: Alive');
      expect(screen.getByText(/Species:/)).toHaveTextContent('Species: Human');
      expect(screen.getByText(/Gender:/)).toHaveTextContent('Gender: Male');
      expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/image.jpg');
    });
  });
  test('calls hideDetailedCard on overlay click', async () => {
    const hideDetailedCardMock = vi.fn();
    const mockCharacterData = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      gender: 'Male',
      species: 'Human',
      image: 'https://example.com/image.jpg',
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockCharacterData),
    } as unknown as Response);

    render(
      <Provider store={store}>
        <DetailedCard hideDetailedCard={hideDetailedCardMock} detailedcardID={1} />
      </Provider>,
    );

    await waitFor(() => {
      const overlay = screen.getByTestId('overlay');
      fireEvent.click(overlay);
      expect(hideDetailedCardMock).toHaveBeenCalled();
    });
  });
  test('handles fetch error gracefully', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Fetch error'));

    render(
      <Provider store={store}>
        <DetailedCard hideDetailedCard={() => {}} detailedcardID={1} />
      </Provider>,
    );
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });
  test('calls hideDetailedCard on Enter key press', async () => {
    const hideDetailedCardMock = vi.fn();
    const mockCharacterData = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      gender: 'Male',
      species: 'Human',
      image: 'https://example.com/image.jpg',
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockCharacterData),
    } as unknown as Response);

    render(
      <Provider store={store}>
        <DetailedCard hideDetailedCard={hideDetailedCardMock} detailedcardID={1} />
      </Provider>,
    );

    await waitFor(() => {
      const overlay = screen.getByTestId('overlay');
      fireEvent.keyDown(overlay, { key: 'Enter' });
      expect(hideDetailedCardMock).toHaveBeenCalled();
    });
  });
  test('calls hideDetailedCard on Space key press', async () => {
    const hideDetailedCardMock = vi.fn();
    const mockCharacterData = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      gender: 'Male',
      species: 'Human',
      image: 'https://example.com/image.jpg',
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockCharacterData),
    } as unknown as Response);

    render(
      <Provider store={store}>
        <DetailedCard hideDetailedCard={hideDetailedCardMock} detailedcardID={1} />
      </Provider>,
    );

    await waitFor(() => {
      const overlay = screen.getByTestId('overlay');
      fireEvent.keyDown(overlay, { key: ' ' });
      expect(hideDetailedCardMock).toHaveBeenCalled();
    });
  });
});
