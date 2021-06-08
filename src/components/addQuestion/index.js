import { connect } from 'react-redux';
import { createQuestion } from '../../store/question.js';
import { AddQuestionForm as View } from './addQuestion.js';

const mapDispatchToProps = {
  createQuestion
};

export const AddQuestionForm = connect(
  () => ({}),
  mapDispatchToProps
)(View);
