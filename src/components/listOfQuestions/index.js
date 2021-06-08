import React from 'react';
import { connect } from 'react-redux';
import { getQuestionsList } from '../../store/index.js';
import { acceptQuestion, rejectQuestion } from '../../store/question.js';
import { Question } from './question.js';

import styles from './index.module.css';

let ListOfQuestions = ({
  questions = [],
  positionClass,
  acceptQuestion,
  rejectQuestion
}) => {
  return (
    <div className={`${positionClass} ${styles.listOfQuestions}`}>
      {questions.length > 0 ? (
        questions.map(question => (
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

const mapStateToProps = state => ({
  questions: getQuestionsList(state)
});

const mapDispatchToProps = {
  acceptQuestion,
  rejectQuestion
};

ListOfQuestions = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfQuestions);

export { ListOfQuestions };
