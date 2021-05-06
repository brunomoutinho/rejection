import { acceptQuestion, createQuestion, rejectQuestion } from "./question";
import { reducer as questionReducer, getQuestionScore } from "./question";
import { add, compareDesc, isBefore, isEqual, set } from "date-fns";

const filter = {
  byStatus: (filter) => ({ status }) => filter === status,
};
const sort = {
  byTimestamp: (question1, question2) =>
    compareDesc(question1.timestamp, question2.timestamp),
};

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
export const calculateCurrentStreak = (state) => {
  // eslint-disable-next-line no-unused-vars
  const [_, streak] = Object.values(state)
    .filter(filter.byStatus("Rejected"))
    .sort(sort.byTimestamp)
    .reduce(
      ([date, streak], question) => {
        if (isBefore(date, question.timestamp)) return [date, streak];
        if (isEqual(date, question.timestamp))
          return [add(date, { days: -1 }), streak + 1];
        return [add(date, { days: -1 }), streak];
      },
      [
        set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
        0,
      ]
    );
  return streak;
};
