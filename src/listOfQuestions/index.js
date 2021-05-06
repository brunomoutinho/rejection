import { connect } from "react-redux";
import { getQuestionsList } from "../store/index.js";

import "./index.css";

const Question = ({ question: { question, askee, status } = {} }) => {
  return (
    <div className={"list-of-questions__question"}>
      <span className={"list-of-questions__question__question"}>
        Question: {question}
      </span>
      <span className={"list-of-questions__question__askee"}>
        Askee: {askee}
      </span>
      <span className={"list-of-questions__question__status"}>
        Status: {status}
      </span>
    </div>
  );
};

let ListOfQuestions = ({ questions = [], positionClass }) => {
  return (
    <div className={`${positionClass} list-of-questions`}>
      {questions.map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  questions: getQuestionsList(state),
});

ListOfQuestions = connect(mapStateToProps)(ListOfQuestions);

export { ListOfQuestions };
