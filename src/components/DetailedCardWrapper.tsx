import React, {Suspense} from "react";
import DetailedCard from "./DetailedCard";
import {fetchDataById} from "./api/fetchDataById";
import Loader from "./loader/Loader";
import {type DetailedCardWrappeerProps} from "@/types/types";

const DetailedCardWrapper = async ({
  detailedcardID,
  hideDetailedCard,
}: DetailedCardWrappeerProps) => {
  const detailedCardData = await fetchDataById(detailedcardID);

  if (detailedCardData === false) {
    return <div>Failed to fetch characters</div>;
  }

  return (
    <Suspense fallback={<Loader />}>
      <DetailedCard
        detailedCardData={detailedCardData}
        hideDetailedCard={hideDetailedCard}
      />
    </Suspense>
  );
};

export default DetailedCardWrapper;
