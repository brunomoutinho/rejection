import { call, put } from 'redux-saga/effects';
import { fetchController } from '../controllers';
import { createQuestion } from '../question';
import { createQuestionSaga } from './question';
import { saveQuestion } from '../../api';
// import { fetchController } from '../controllers';

describe('Question sagas', () => {
  test('Running the create question saga saves the question in the DB and the store', () => {
    const question = createQuestion().payload;
    const createQuestionGen = createQuestionSaga(question);

    {
      const expected = put(fetchController.actionCreators.fetch());
      const actual = createQuestionGen.next().value;

      expect(actual).toStrictEqual(expected);
    }

    {
      const expected = put(createQuestion(question));
      const actual = createQuestionGen.next().value;

      expect(actual).toStrictEqual(expected);
    }

    {
      const expected = call(saveQuestion, question);
      const actual = createQuestionGen.next().value;

      expect(actual).toStrictEqual(expected);
    }

    {
      const expected = put(fetchController.actionCreators.reportSuccess());
      const actual = createQuestionGen.next({
        status: 'success',
        payload: question,
      }).value;

      expect(actual).toStrictEqual(expected);
    }

    {
      const expected = put(
        fetchController.actionCreators.handleSuccess(question)
      );
      const actual = createQuestionGen.next().value;

      expect(actual).toStrictEqual(expected);
    }
  });

  test('Running the create question saga, rolls back the change in store if an error occurs', () => {
    const question = createQuestion().payload;
    const createQuestionGen = createQuestionSaga(question);

    {
      const expected = put(fetchController.actionCreators.fetch());
      const actual = createQuestionGen.next().value;

      expect(actual).toStrictEqual(expected);
    }

    {
      const expected = put(createQuestion(question));
      const actual = createQuestionGen.next().value;

      expect(actual).toStrictEqual(expected);
    }

    {
      const expected = call(saveQuestion, question);
      const actual = createQuestionGen.next().value;

      expect(actual).toStrictEqual(expected);
    }

    {
      const expected = put(fetchController.actionCreators.reportError());
      const actual = createQuestionGen.next({
        status: 'error',
        payload: { question, message: 'Error' },
      }).value;

      expect(actual).toStrictEqual(expected);
    }

    {
      const expected = put(
        fetchController.actionCreators.handleError({
          question,
          message: 'Error',
        })
      );
      const actual = createQuestionGen.next().value;

      expect(actual).toStrictEqual(expected);
    }
  });
});
