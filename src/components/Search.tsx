import React from "react";

export default class Search extends React.Component {
  render() {
    return (
      <div className="search-wrapper">
        <input
          className="search"
          type="text"
          placeholder="Search anything...."
        />
        <button className="search-button m1l-[-14px]">
          <img src="./../../src/assets/images/search.svg" alt="" />
        </button>
      </div>
    );
  }
}
