import React from "react";
import MainText from "./components/MainText";
import SingleCharacter from "./components/SingleCharacter";

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <MainText />
        <div className="grid-container">
          <SingleCharacter />
          <SingleCharacter />
          <SingleCharacter />
          <SingleCharacter />
          <SingleCharacter />
          <SingleCharacter />
          <SingleCharacter />
          <SingleCharacter />
        </div>
      </div>
    );
  }
}
