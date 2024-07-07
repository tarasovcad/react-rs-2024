import React from "react";
import MainText from "./components/MainText";
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
    console.log("componentDidMount");

    console.log("true");
    fetch("https://rickandmortyapi.com/api/character/?page=1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({characters: data, isLoading: false});
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

    console.log(false);
  }

  handleSearchChange = (term: string) => {
    this.setState({term});
  };

  render() {
    console.log(this.state.term);
    const {isLoading, characters, notFound} = this.state;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <div className="container">
        <Navbar onSearchChange={this.handleSearchChange} />
        <MainText />
        {notFound ? <h2>No characters found :(</h2> : null}
        {isLoading ? (
          <Loader />
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
