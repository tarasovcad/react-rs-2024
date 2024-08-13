import Main from "@/pages/search/[page]";
import "@testing-library/jest-dom";
import {render, screen, fireEvent} from "@testing-library/react";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/router";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import selectedDataReducer from "@/store/slices/selectedDataSlice";
import {CharactersResponse} from "@/types/types";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useSearchParams: jest.fn(),
}));

const mockStore = configureStore({
  reducer: {
    selectedData: selectedDataReducer,
  },
});

const mockCharacters: CharactersResponse = {
  info: {
    pages: 1,
  },
  results: [],
};

describe("Main Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: "/",
      query: {},
      push: mockPush,
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
    }));
  });

  (useSearchParams as jest.Mock).mockReturnValue({
    get: jest.fn().mockReturnValue(null),
  });

  it("renders the main heading", () => {
    render(
      <Provider store={mockStore}>
        <Main
          characters={mockCharacters}
          notFound={false}
          totalPages={1}
          initialTerm=""
          isLoading={false}
        />
        ,
      </Provider>,
    );
    const heading = screen.getByTestId("main-heading");
    expect(heading).toHaveTextContent("Characters");
  });

  //   it("shows loader when isLoading is true", () => {
  //     render(
  //       <Provider store={mockStore}>
  //         <Main
  //           characters={mockCharacters}
  //           notFound={false}
  //           totalPages={1}
  //           initialTerm=""
  //           isLoading={true}
  //         />
  //       </Provider>,
  //     );
  //     // Simulate loading state

  //     const loader = screen.getByTestId("loader");
  //     expect(loader).toBeInTheDocument();
  //   });

  it("displays characters when available", () => {
    const mockCharacters: CharactersResponse = {
      info: {
        pages: 1,
      },
      results: [
        {id: 1, name: "Rick Sanchez"},
        {id: 2, name: "Morty Smith"},
      ],
    };
    render(
      <Provider store={mockStore}>
        <Main
          characters={mockCharacters}
          notFound={false}
          totalPages={1}
          initialTerm=""
          isLoading={false}
        />
      </Provider>,
    );
    const character1 = screen.getByTestId("character-1");
    const character2 = screen.getByTestId("character-2");
    expect(character1).toBeInTheDocument();
    expect(character2).toBeInTheDocument();
  });

  it("handles page click and opens detailed card", () => {
    const mockCharacters: CharactersResponse = {
      info: {
        pages: 1,
      },
      results: [{id: 1, name: "Rick Sanchez"}],
    };
    render(
      <Provider store={mockStore}>
        <Main
          characters={mockCharacters}
          notFound={false}
          totalPages={1}
          initialTerm=""
          isLoading={false}
        />
      </Provider>,
    );
    const character = screen.getByTestId("character-1");
    fireEvent.click(character);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/",
      query: {details: "1"},
    });
  });
});
