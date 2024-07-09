import React from "react";
import {type SearchProps, SearchState} from "../types/types";

export default class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      term: "",
    };
  }
  onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newTerm = event.currentTarget.value;
    this.setState({term: newTerm});
  };

  onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    this.props.onSearchChange(this.state.term);
    localStorage.setItem("tarasovcardFormData", JSON.stringify(this.state));
  };

  componentDidMount(): void {
    const savedData = localStorage.getItem("tarasovcardFormData");

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        this.setState(parsedData);
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
  }

  render() {
    return (
      <form className="search-wrapper" onSubmit={this.onFormSubmit}>
        <input
          value={this.state.term}
          onChange={this.onInputChange}
          className="search"
          type="text"
          placeholder="Search character...."
        />
        <button className="search-button m1l-[-14px]">
          <img src="./images/search.svg" alt="" />
        </button>
      </form>
    );
  }
}
