import React from "react";
import {SingleState} from "../types/types";
const SingleCharacter: React.FC<SingleState> = ({
  character,
  handlePageClick,
}) => {
  const {name, image, id} = character;

  return (
    // <Link to={`details/${name}`}>
    <div
      className="flex flex-col cursor-pointer"
      onClick={() => handlePageClick(id)}>
      <img src={image} alt={name} loading="lazy" />
      <h2 className="mt-[12px] text-lg">{name} </h2>
    </div>
    // </Link>
  );
};

export default SingleCharacter;
