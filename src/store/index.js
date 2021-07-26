import { combineReducers } from 'redux';
import {
  reducer as questionsReducer,
  getAsList,
  getById,
  calculateCurrentStreak,
  calculateScore,
} from './questions';
import { fetchController } from './controllers';

export const reducer = combineReducers({
  questions: questionsReducer,
  controllers: fetchController.reducer,
});

export const getQuestionsList = (state) => getAsList(state.questions);
export const getQuestionById = (state) => (id) => getById(state.questions)(id);
export const getScore = (state) => calculateScore(state.questions);
export const getCurrentStreak = (state) =>
  calculateCurrentStreak(state.questions);
