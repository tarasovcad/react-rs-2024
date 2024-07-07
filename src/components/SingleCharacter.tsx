import React from "react";
import {SingleState} from "../types/types";
import {SingleProps} from "../types/types";
export default class SingleCharacter extends React.Component<
  SingleProps,
  SingleState
> {
  constructor(props: SingleProps) {
    super(props);
    this.state = {
      character: props.character,
    };
    console.log(this.state.character);
  }

  render() {
    // console.log(this.state.character.name);
    return (
      <div className="flex flex-col">
        <img src={this.state.character.image} alt={this.state.character.name} />
        <h2 className="mt-[12px]">{this.state.character.name} </h2>
      </div>
    );
  }
}
