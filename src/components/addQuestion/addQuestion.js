import React from 'react';

import styles from './index.module.css';

export const AddQuestionForm = ({ createQuestion, positionClass }) => {
  const onSubmit = event => {
    event.preventDefault();
    const {
      question: { value: question },
      askee: { value: askee },
      status: { value: status }
    } = event.target;
    createQuestion({ question, askee, status });
  };
  return (
    <div className={positionClass}>
      <form className={styles.form} onSubmit={onSubmit}>
        <section className={styles.question}>
          <label className={styles.questionLabel} htmlFor="question">
            Question
          </label>
          <input
            className={styles.questionInput}
            id="question"
            placeholder="Can I have another donut?"
            required
          />
        </section>

        <section className={styles.askee}>
          <label className={styles.askeeLabel} htmlFor="askee">
            Askee
          </label>
          <input
            className={styles.askeeInput}
            id="askee"
            placeholder="Anonymous"
          />
        </section>

        <section className={styles.statusSaveContainer}>
          <section className={styles.status}>
            <label className={styles.statusLabel} htmlFor="status">
              Status
            </label>
            <select className={styles.statusSelect} id="status">
              <option value="Unanswered">Unanswered</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </section>

          <section className={styles.save}>
            <button className={styles.saveButton}>Save</button>
          </section>
        </section>
      </form>
    </div>
  );
};
