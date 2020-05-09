import React from "react";

const Question = (props) => {
  return (
    <div>
      <h3>{props.country==="" ? "what capital is it?": `what is the capital ${props.country}?`}</h3>
    </div>
  );
};

export default Question;
