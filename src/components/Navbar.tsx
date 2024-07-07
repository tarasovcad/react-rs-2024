import React from "react";
import Search from "./Search";

export default class Navbar extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      term: "",
    };
  }
  handleSearchChange = (term: string) => {
    this.setState({term});
  };
  render() {
    return (
      <div className="header max-h-[90px] bg-navbar py-[13px] px-[26px] flex justify-between">
        <div className="logo w-[64px] h-[64px]">
          <img src="./../../src/assets/images/logo.png" alt="Logo" />
        </div>
        <Search onSearchChange={this.handleSearchChange} />
        <h2>Data: </h2>
      </div>
    );
  }
}
