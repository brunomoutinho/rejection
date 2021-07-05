import React from "react";

import styles from "./index.module.css";

export const Question = ({
  acceptQuestion,
  rejectQuestion,
  question: { question = "", askee = "", status = "", id = "" } = {},
}) => {
  return (
    <div className={styles.question}>
      <span>Question: {question}</span>
      <span>Askee: {askee}</span>
      <span>Status: {status}</span>
      {status === "Unanswered" ? (
        <section>
          Modify status:
          <button onClick={() => acceptQuestion(id)}>Accept</button>
          <button onClick={() => rejectQuestion(id)}>Reject</button>
        </section>
      ) : null}
    </div>
  );
};
