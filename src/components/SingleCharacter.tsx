import React from "react";
import {SingleState} from "../types/types";

const SingleCharacter: React.FC<SingleState> = ({character}) => {
  const {name, image} = character;
  return (
    <div className="flex flex-col">
      <img src={image} alt={name} loading="lazy" />
      <h2 className="mt-[12px] text-lg">{name} </h2>
    </div>
  );
};

export default SingleCharacter;
