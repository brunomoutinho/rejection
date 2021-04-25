import { acceptQuestion, createQuestion, rejectQuestion } from "./question";
import { reducer as questionReducer, getQuestionScore } from "./question";

const initialState = {};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case createQuestion.type:
    case rejectQuestion.type:
    case acceptQuestion.type:
      return {
        ...state,
        [action.payload.id]: questionReducer(state[action.payload.id], action),
      };
    default:
      return state;
  }
};

export const getAsList = (state) => Object.values(state);
export const getById = (state) => (id) => state[id];
export const calculateScore = (state) => {
  return Object.values(state).reduce(
    (acc, question) => acc + getQuestionScore(question),
    0
  );
};
