import { connect } from 'react-redux';
import { getQuestionsList } from '../../store/index.js';
import { acceptQuestion, rejectQuestion } from '../../store/question.js';
import { ListOfQuestions as View } from './listOfQuestions.js';

const mapStateToProps = (state) => ({
  questions: getQuestionsList(state),
});

const mapDispatchToProps = {
  acceptQuestion,
  rejectQuestion,
};

export const ListOfQuestions = connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
