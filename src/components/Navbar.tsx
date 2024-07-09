import React from "react";
import Search from "./Search";
import {type SearchProps, NavbarState} from "../types/types";

export default class Navbar extends React.Component<SearchProps, NavbarState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      term: "",
      shouldThrowError: false,
    };
  }
  handleSearchChange = (term: string) => {
    this.setState({term});

    this.props.onSearchChange(term);
  };
  callError() {
    throw new Error("This is a test error");
  }
  render() {
    if (this.state.shouldThrowError) {
      this.callError();
    }
    return (
      <div className="header max-h-[90px] bg-navbar py-[13px] px-[26px] flex justify-between">
        <div className="logo w-[64px] h-[64px]">
          <img src="./images/logo.png" alt="Logo" />
        </div>
        <div className="flex gap-4">
          <button
            className="error-button"
            onClick={() => this.setState({shouldThrowError: true})}>
            Throw error
          </button>
          <Search onSearchChange={this.handleSearchChange} />
        </div>
      </div>
    );
  }
}
