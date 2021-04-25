import { combineReducers } from "redux";
import {
  reducer as questionsReducer,
  getAsList,
  getById,
  calculateScore,
} from "./questions";

export const reducer = combineReducers({
  questions: questionsReducer,
});

export const getQuestionsList = (state) => getAsList(state.questions);
export const getQuestionById = (state) => (id) => getById(state.questions)(id);
export const getScore = (state) => calculateScore(state.questions);
