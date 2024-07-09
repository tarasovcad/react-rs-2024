import React from "react";
import {type SingleState} from "../types/types";
import {type SingleProps} from "../types/types";
export default class SingleCharacter extends React.Component<
  SingleProps,
  SingleState
> {
  constructor(props: SingleProps) {
    super(props);
    this.state = {
      character: props.character,
    };
  }

  render() {
    return (
      <div className="flex flex-col">
        <img
          src={this.state.character.image}
          alt={this.state.character.name}
          loading="lazy"
        />
        <h2 className="mt-[12px]">{this.state.character.name} </h2>
      </div>
    );
  }
}
