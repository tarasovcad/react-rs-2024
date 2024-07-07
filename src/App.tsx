import React from "react";
import MainText from "./components/MainText";
import SingleCharacter from "./components/SingleCharacter";
import {Character} from "./types/types";
import {AppState} from "./types/types";
import Loader from "./components/Loader";
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
      });

    console.log(false);
  }

  render() {
    const {isLoading, characters} = this.state;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <div className="container">
        <MainText />
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
