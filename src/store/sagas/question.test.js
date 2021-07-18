import { call, put } from 'redux-saga/effects'
import { requestSent } from '../controllers'
import { createQuestion } from '../question'
import { createQuestionSaga } from './question'
import { saveQuestion } from '../../api'

describe('Question sagas', () => {
  test('Running the create question saga results in a call to save the question in the DB', () => {
    const question = createQuestion().payload
    const createQuestionGen = createQuestionSaga(question)

    {
      const expected = put(requestSent())
      const actual = createQuestionGen.next().value

      expect(actual).toStrictEqual(expected)
    }

    {
      const expected = call(saveQuestion, { data: question })
      const actual = createQuestionGen.next().value

      expect(actual).toStrictEqual(expected)
    }
  })
})