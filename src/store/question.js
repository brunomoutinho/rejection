import cuid from 'cuid';
import { set } from 'date-fns';

export const reducer = (state, action) => {
  switch (action.type) {
    case createQuestion.type:
      return { ...action.payload };
    case rejectQuestion.type:
      return { ...state, status: 'Rejected' };
    case acceptQuestion.type:
      return { ...state, status: 'Accepted' };
    default:
      return state;
  }
};

export const createQuestion = ({
  id = cuid(),
  timestamp = set(new Date(), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  }),
  question = 'Placeholder question',
  askee = 'Anonymous',
  status = 'Unanswered',
} = {}) => ({
  type: createQuestion.type,
  payload: {
    id,
    timestamp,
    question,
    askee,
    status,
  },
});
createQuestion.type = 'CREATE_QUESTION';

export const rejectQuestion = (id) => ({
  type: rejectQuestion.type,
  payload: { id },
});
rejectQuestion.type = 'REJECT_QUESTION';

export const acceptQuestion = (id) => ({
  type: acceptQuestion.type,
  payload: { id },
});
acceptQuestion.type = 'ACCEPT_QUESTION';

export const getQuestionScore = (question) =>
  question.status === 'Rejected' ? 10 : question.status === 'Accepted' ? 1 : 0;
