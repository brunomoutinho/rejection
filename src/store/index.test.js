import { add, set } from 'date-fns';

import { reducer, getCurrentStreak, getQuestionsList, getScore } from './index';
import { createQuestion, rejectQuestion, acceptQuestion } from './question';

const generateStoreState = ({ questions = {} } = {}) => ({
  questions,
});

test('Default application state is an object', () => {
  const actual = reducer();
  const expected = generateStoreState();

  expect(actual).toStrictEqual(expected);
});

test('When I create a question, it is added to the state', () => {
  const action = createQuestion();

  const actual = getQuestionsList(reducer(undefined, action));
  const expected = [action.payload];

  expect(actual).toEqual(expected);
});

test('When I mark a question as Rejected, the question is updated in the state', () => {
  const createQuestionAction = createQuestion();
  const actions = [
    createQuestionAction,
    rejectQuestion(createQuestionAction.payload.id),
  ];

  const actual = getQuestionsList(actions.reduce(reducer, undefined));
  const expected = [
    {
      ...createQuestionAction.payload,
      status: 'Rejected',
    },
  ];

  expect(actual).toEqual(expected);
});

test('When I mark a question as Accepted, the question is updated in the state', () => {
  const createQuestionAction = createQuestion();
  const actions = [
    createQuestionAction,
    acceptQuestion(createQuestionAction.payload.id),
  ];

  const actual = getQuestionsList(actions.reduce(reducer, undefined));
  const expected = [
    {
      ...createQuestionAction.payload,
      status: 'Accepted',
    },
  ];

  expect(actual).toEqual(expected);
});

test('When I have only one Unanswered question, my score is equal to 0', () => {
  const action = createQuestion();

  const actual = getScore(reducer(undefined, action));
  const expected = 0;

  expect(actual).toBe(expected);
});

test('When I have only one Accepted question, my score is equal to 1', () => {
  const action = createQuestion({ status: 'Accepted' });

  const actual = getScore(reducer(undefined, action));
  const expected = 1;

  expect(actual).toBe(expected);
});

test('When I have only one Rejected question, my score is equal to 10', () => {
  const action = createQuestion({ status: 'Rejected' });

  const actual = getScore(reducer(undefined, action));
  const expected = 10;

  expect(actual).toBe(expected);
});

test('When I have multiple questions with different statuses, score gets calculated correctly', () => {
  const actions = [
    createQuestion({ status: 'Unanswered' }),
    createQuestion({ status: 'Accepted' }),
    createQuestion({ status: 'Rejected' }),
  ];

  const actual = getScore(actions.reduce(reducer, undefined));
  const expected = 11;

  expect(actual).toBe(expected);
});

test('When I have no questions, current streak should be 0', () => {
  const actual = getCurrentStreak(reducer());
  const expected = 0;

  expect(actual).toBe(expected);
});

test('When I have only an unanswered question, current streak should be 0', () => {
  const actions = [createQuestion()];
  const actual = getCurrentStreak(actions.reduce(reducer, undefined));
  const expected = 0;

  expect(actual).toBe(expected);
});

test('When I have only an accepted question, current streak should be 0', () => {
  const actions = [createQuestion({ status: 'Accepted' })];
  const actual = getCurrentStreak(actions.reduce(reducer, undefined));
  const expected = 0;

  expect(actual).toBe(expected);
});

test('When I have only a rejected question, but it is from a day before today, current streak should be 0', () => {
  const yesterday = add(
    set(new Date(), {
      days: -1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    { days: -1 }
  );
  const actions = [
    createQuestion({ status: 'Rejected', timestamp: yesterday }),
  ];
  const actual = getCurrentStreak(actions.reduce(reducer, undefined));
  const expected = 0;

  expect(actual).toBe(expected);
});

test('When I have only a rejected question, and it is from today, current streak should be 1', () => {
  const actions = [createQuestion({ status: 'Rejected' })];
  const actual = getCurrentStreak(actions.reduce(reducer, undefined));
  const expected = 1;

  expect(actual).toBe(expected);
});

test('When I have two rejected questions, one from today, the other from yesterday, current streak should be 2', () => {
  const yesterday = add(
    set(new Date(), {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    { days: -1 }
  );
  const actions = [
    createQuestion({ status: 'Rejected', timestamp: yesterday }),
    createQuestion({ status: 'Rejected' }),
  ];
  const actual = getCurrentStreak(actions.reduce(reducer, undefined));
  const expected = 2;

  expect(actual).toBe(expected);
});

test('When I have two rejected questions, one from today, the other from the day before yesterday, current streak should be 1', () => {
  const dayBeforeYesterday = add(
    set(new Date(), {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    { days: -2 }
  );
  const actions = [
    createQuestion({ status: 'Rejected', timestamp: dayBeforeYesterday }),
    createQuestion({ status: 'Rejected' }),
  ];
  const actual = getCurrentStreak(actions.reduce(reducer, undefined));
  const expected = 1;
  expect(actual).toBe(expected);
});
