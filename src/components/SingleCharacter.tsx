import React from "react";
import {SingleState} from "../types/types";

const SingleCharacter: React.FC<SingleState> = ({character}) => {
  const {name, image, status} = character;
  return (
    <div className="flex flex-col">
      <img src={image} alt={name} loading="lazy" />
      <h2 className="mt-[12px]">{name} </h2>
      <p className="desc">Alive or not: {status}</p>
    </div>
  );
};

export default SingleCharacter;
