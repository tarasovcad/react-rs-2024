import React from "react";
import SingleCharacter from "./components/SingleCharacter";
import {Character} from "./types/types";
import {AppState} from "./types/types";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
// import {Props} from "./types/types";
// import {Characters} from "./types/types";

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      characters: {
        results: [],
      },
      isLoading: true,
      notFound: false,
      term: "",
    };
  }

  componentDidMount(): void {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        this.setState(parsedData, () => {
          this.fetchCharacters();
        });
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
  }
  componentDidUpdate(): void {
    this.fetchCharacters();
  }
  fetchCharacters() {
    fetch(`https://rickandmortyapi.com/api/character/?name=${this.state.term}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({characters: data, isLoading: false, notFound: false});
      })
      .catch((err) => {
        console.error("There was a problem with the fetch operation:", err);
        this.setState({
          isLoading: false,
        });
        this.setState({
          notFound: true,
        });
      });
  }

  handleSearchChange = (term: string) => {
    this.setState({term});
  };

  render() {
    console.log(this.state.term);
    const {isLoading, characters, notFound, term} = this.state;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <div className="container">
        <Navbar onSearchChange={this.handleSearchChange} />
        <h1 className="characters mb-[4px] mt-[50px]">
          {term ? `Search results for: ${term}` : "Characters"}
        </h1>
        <h2 className="description mb-[45px]">
          All of the characters that appear in the
          <a
            href="https://rickandmorty.fandom.com/wiki/Rickipedia"
            target="_blank"
            rel="noreferrer">
            <em> Rick and Morty </em>
          </a>
          franchise.
        </h2>
        {notFound ? (
          <h2>No characters found :(</h2>
        ) : (
          <div className="grid-container">
            {characters.results.map((character: Character) => {
              return (
                <SingleCharacter key={character.id} character={character} />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
