import { call, put } from 'redux-saga/effects'
import { saveQuestion } from '../../api'
import { requestSent } from '../controllers'

export function* createQuestionSaga(question) {
  yield put(requestSent())
  yield call(saveQuestion, question)
  /** yield put(createQuestion, { payload: data }) */
}