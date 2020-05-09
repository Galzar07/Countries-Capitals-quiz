import React from "react";
const Answers = (props) => {

    
  const answers = props.answers.map((answer) => (
    <div key={answer.name} className="answer">
      {answer.capital !== "" ? (
        <button onClick={props.check}>{answer.capital}</button>
      ) : (
        <button onClick={props.check}>x</button>
      )}
    </div>
  ));

  return <div>{answers}</div>;
};

export default Answers;
