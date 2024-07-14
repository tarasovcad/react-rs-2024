import React from "react";

const DetailedCard = () => {
  return (
    <div className="detailed-card__container">
      <div className="close"></div>
      <img src="../images/18.jpeg" alt="Image" />
      <h1>Beth Smith</h1>
      <h2>
        Status: <span>Dead</span>
      </h2>
      <h2>
        Species: <span>Humanoid</span>
      </h2>
      <h2>
        Gender: <span>Male</span>
      </h2>
    </div>
  );
};

export default DetailedCard;
