import React from "react";
import {SingleState} from "../types/types";
const SingleCharacter: React.FC<SingleState> = ({
  character,
  handlePageClick,
}) => {
  const {name, image, id} = character;

  return (
    <div
      className="flex flex-col cursor-pointer"
      onClick={() => handlePageClick(id)}
      data-testid={`character-${id}`}>
      <img src={image} alt={name} loading="lazy" />
      <h2 className="mt-[12px] text-lg" data-testid="character-name">
        {name}
      </h2>
    </div>
    // </Link>
  );
};

export default SingleCharacter;
