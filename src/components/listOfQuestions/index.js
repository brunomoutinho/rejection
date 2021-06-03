import { connect } from 'react-redux';
import { getQuestionsList } from '../../store/index.js';
import { acceptQuestion, rejectQuestion } from '../../store/question.js';
import { Question } from './question.js';

import styles from './index.module.css';

let ListOfQuestions = ({
  questions = [],
  positionClass,
  onAccept,
  onReject
}) => {
  return (
    <div className={`${positionClass} ${styles.listOfQuestions}`}>
      {Array.isArray(questions) && questions.length > 0 ? (
        questions.map(question => (
          <Question
            key={question.id}
            onAccept={onAccept}
            onReject={onReject}
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
  onAccept: acceptQuestion,
  onReject: rejectQuestion
};

ListOfQuestions = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfQuestions);

export { ListOfQuestions };
