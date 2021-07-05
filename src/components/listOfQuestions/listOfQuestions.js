import React from "react";
import { Question } from "./question.js";

import styles from "./index.module.css";

export const ListOfQuestions = ({
  questions = [],
  positionClass,
  acceptQuestion,
  rejectQuestion,
}) => {
  return (
    <div className={`${positionClass} ${styles.listOfQuestions}`}>
      {questions.length > 0 ? (
        questions.map((question) => (
          <Question
            key={question.id}
            acceptQuestion={acceptQuestion}
            rejectQuestion={rejectQuestion}
            question={question}
          />
        ))
      ) : (
        <span>There are no questions yet.</span>
      )}
    </div>
  );
};
