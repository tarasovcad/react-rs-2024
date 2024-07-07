import React from "react";
import {SearchState} from "../types/types";

export default class Search extends React.Component<{}, SearchState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      term: "",
    };
  }
  onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({term: event.currentTarget.value});
  };

  componentDidMount(): void {
    console.log("Mount");
    const savedData = localStorage.getItem("formData");

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        this.setState(parsedData);
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
  }

  componentDidUpdate(): void {
    localStorage.setItem("formData", JSON.stringify(this.state));
  }
  render() {
    console.log(this.state.term);
    return (
      <div className="search-wrapper">
        <input
          value={this.state.term}
          onChange={this.onInputChange}
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
