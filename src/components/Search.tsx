import React from "react";
import {SearchProps, SearchState} from "../types/types";

export default class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      term: "",
    };
  }
  onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newTerm = event.currentTarget.value;
    //  => Not right
    // this.setState({term: newTerm});
    // this.props.onSearchChange(this.state.term);
    this.setState({term: newTerm}, () => {
      this.props.onSearchChange(newTerm);
    });
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
