import React from "react";
import Search from "./Search";
import {SearchProps, SearchState} from "../types/types";

export default class Navbar extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      term: "",
    };
  }
  handleSearchChange = (term: string) => {
    this.setState({term});

    this.props.onSearchChange(term);
  };
  render() {
    //console.log(this.state.term);
    return (
      <div className="header max-h-[90px] bg-navbar py-[13px] px-[26px] flex justify-between">
        <div className="logo w-[64px] h-[64px]">
          <img src="./../../src/assets/images/logo.png" alt="Logo" />
        </div>
        <Search onSearchChange={this.handleSearchChange} />
      </div>
    );
  }
}
