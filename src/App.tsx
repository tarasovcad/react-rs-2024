import React, {ReactNode} from "react";
import MainText from "./components/MainText";
import SingleCharacter from "./components/SingleCharacter";

interface Props {
  children: ReactNode;
}

interface Character {
  id: number;
  name: string;
  image: string;
}

interface Characters {
  characters: {
    results: [];
  };
}

export default class App extends React.Component<Props, Characters> {
  constructor(props: Props) {
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
      .then(response => response.json())
      .then(data => {
        this.setState({characters: data});
      });
  }
  render() {
    return (
      <div className="container">
        <MainText />
        <div className="grid-container">
          {this.state.characters.results.map((character: Character) => {
            return <SingleCharacter key={character.id} />;
          })}
        </div>
      </div>
    );
  }
}
