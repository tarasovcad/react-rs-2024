import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import SingleCharacter from '~/components/SingleCharacter';
import { store } from '~/store';
import { Character } from '~/types/types';

describe('SingleCharacter', () => {
  // Create a "fake" character
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
  };
  const mockHandlePageClick = vi.fn();
  it('renders character name and image', () => {
    render(
      <Provider store={store}>
        <SingleCharacter character={mockCharacter} handlePageClick={mockHandlePageClick} />
      </Provider>,
    );
    const characterName = screen.getByText('Rick Sanchez');
    const characterImage = screen.getByAltText('Rick Sanchez');
    expect(characterName).toBeInTheDocument();
    expect(characterImage).toBeInTheDocument();
  });
  it('calls handlePageClick when clicking on SingleCharacter card', () => {
    render(
      <Provider store={store}>
        <SingleCharacter character={mockCharacter} handlePageClick={mockHandlePageClick} />
      </Provider>,
    );
    const characterDiv = screen.getByText('Rick Sanchez').closest('div')!;
    fireEvent.click(characterDiv);
    expect(mockHandlePageClick).toHaveBeenCalledWith(1);
  });
  it('calls handlePageClick when pressing Enter or Space on SingleCharacter card', () => {
    render(
      <Provider store={store}>
        <SingleCharacter character={mockCharacter} handlePageClick={mockHandlePageClick} />
      </Provider>,
    );
    const characterDiv = screen.getByTestId('character-1');
    fireEvent.keyDown(characterDiv, { key: 'Enter', code: 'Enter' });
    expect(mockHandlePageClick).toHaveBeenCalledWith(1);
    fireEvent.keyDown(characterDiv, { key: ' ', code: 'Space' });
    expect(mockHandlePageClick).toHaveBeenCalledWith(1);
  });
  it('adds or removes character from selectedItems when checkbox is clicked', () => {
    render(
      <Provider store={store}>
        <SingleCharacter character={mockCharacter} handlePageClick={mockHandlePageClick} />
      </Provider>,
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
