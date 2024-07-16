import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";

import SingleCharacter from "../../src/components/SingleCharacter";
import {Character} from "../../src/types/types";

describe("SingleCharacter", () => {
  // Create a "fake" character
  const mockCharacter: Character = {
    id: 1,
    name: "Rick Sanchez",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    status: "Alive",
    species: "Human",
    gender: "Male",
  };

  const mockHandlePageClick = vi.fn();

  it("renders character name and image", () => {
    render(
      <SingleCharacter
        character={mockCharacter}
        handlePageClick={mockHandlePageClick}
      />,
    );

    const characterName = screen.getByText("Rick Sanchez");
    const characterImage = screen.getByAltText("Rick Sanchez");
    expect(characterName).toBeInTheDocument();
    expect(characterImage).toBeInTheDocument();
  });

  it("calls handlePageClick when clicking on SingleCharacter card", () => {
    render(
      <SingleCharacter
        character={mockCharacter}
        handlePageClick={mockHandlePageClick}
      />,
    );
    // closest - we want click on div, not on text
    const characterDiv = screen.getByText("Rick Sanchez").closest("div")!;
    // simulates a click on the specified element.
    fireEvent.click(characterDiv);
    expect(mockHandlePageClick).toHaveBeenCalledWith(1);
  });
});
