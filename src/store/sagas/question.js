import { call, put } from 'redux-saga/effects';
import { saveQuestion } from '../../api';
import { fetchController } from '../controllers';
import { createQuestion } from '../question';

export function* createQuestionSaga(question) {
  yield put(fetchController.actionCreators.fetch());
  yield put(createQuestion(question));
  try {
    const result = yield call(saveQuestion, question);

    if (result.status === 'success') {
      yield put(fetchController.actionCreators.reportSuccess());
      yield put(fetchController.actionCreators.handleSuccess(result.payload));
    } else if (result.status === 'error') {
      yield put(fetchController.actionCreators.reportError());
      yield put(fetchController.actionCreators.handleError(result.payload));
    }
  } catch (e) {
    console.log(e);
  }
}
