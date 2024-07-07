import React from "react";
import MainText from "./components/MainText";
import SingleCharacter from "./components/SingleCharacter";
import {Character} from "./types/types";
import {AppState} from "./types/types";
// import {Props} from "./types/types";
// import {Characters} from "./types/types";

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      characters: {
        results: [],
      },
    };
  }
  componentDidMount(): void {
    console.log("componentDidMount");
    fetch("https://rickandmortyapi.com/api/character/?page=1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({characters: data});
      })
      .catch((err) => {
        console.error("There was a problem with the fetch operation:", err);
      });
  }

  render() {
    //console.log(this.state.characters.results[1]);
    return (
      <div className="container">
        <MainText />
        <div className="grid-container">
          {this.state.characters.results.map((character: Character) => {
            return <SingleCharacter key={character.id} character={character} />;
          })}
        </div>
      </div>
    );
  }
}
