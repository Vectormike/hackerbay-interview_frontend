import React from "react";

const Score = () => {
  return (
    <div>
      <div>
        <p> Score Achieved </p>
        <p id="score_achieved"> 0 </p>
      </div>
      <div>
        <p> Steps Used </p>
        <p id="no_of_moves"> 0 </p>
      </div>
      <div>
        <p> Remaining mushhrooms </p>
        <p id="mushrooms_remaining"> 0 </p>
      </div>
    </div>
  );
};

export default Score;
