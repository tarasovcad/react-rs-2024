import React from "react";

export default class Search extends React.Component {
  render() {
    return (
      <>
        <h1 className="characters mb-[4px] mt-[50px]">Characters</h1>
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
      </>
    );
  }
}
