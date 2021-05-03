import { connect } from "react-redux";
import { getQuestionsList } from "../store/index.js";

const Question = ({ question: { question, askee, status } = {} }) => {
  return (
    <div>
      <p>{question}</p>
      <p>{askee}</p>
      <p>{status}</p>
    </div>
  );
};

let ListOfQuestions = ({ questions = [] }) => {
  return questions.map((question) => (
    <Question key={question.id} question={question} />
  ));
};

const mapStateToProps = (state) => ({
  questions: getQuestionsList(state),
});

ListOfQuestions = connect(mapStateToProps)(ListOfQuestions);

export { ListOfQuestions };
