import pipe from "lodash/fp/pipe";

import { reducer, getQuestionsList, getQuestionById, getScore } from "./index";
import { createQuestion, rejectQuestion, acceptQuestion } from "./question";
import { questionFactory } from "../question";

test("Default application state is an object", () => {
  const actual = typeof reducer();
  const expected = "object";

  expect(actual).toBe(expected);
});

test("When I create a question, it is added to the state", () => {
  const question = questionFactory();
  const action = createQuestion(question);

  const actual = pipe(
    () => getQuestionsList(reducer(undefined, action)),
    (questions) =>
      questions.map((question) => ({
        ...question,
        id: !!question.id,
        timestamp: !!question.timestamp,
      }))
  )();
  const expected = [
    {
      ...question,
      id: true,
      timestamp: true,
    },
  ];

  expect(actual).toEqual(expected);
});

test("When I mark a question as Rejected, the question is updated in the state", () => {
  const question = questionFactory();
  const actions = [createQuestion(question), rejectQuestion(question.id)];

  const actual = getQuestionById(actions.reduce(reducer, undefined))(
    question.id
  );
  const expected = {
    ...question,
    status: "Rejected",
  };

  expect(actual).toEqual(expected);
});

test("When I mark a question as Accepted, the question is updated in the state", () => {
  const question = questionFactory();
  const actions = [createQuestion(question), acceptQuestion(question.id)];

  const actual = getQuestionById(actions.reduce(reducer, undefined))(
    question.id
  );
  const expected = {
    ...question,
    status: "Accepted",
  };

  expect(actual).toEqual(expected);
});

test("When I have only one Unanswered question, my score is equal to 0", () => {
  const question = questionFactory();
  const action = createQuestion(question);

  const actual = getScore(reducer(undefined, action));
  const expected = 0;

  expect(actual).toBe(expected);
});

test("When I have only one Accepted question, my score is equal to 1", () => {
  const question = questionFactory({ status: "Accepted" });
  const action = createQuestion(question);

  const actual = getScore(reducer(undefined, action));
  const expected = 1;

  expect(actual).toBe(expected);
});

test("When I have only one Rejected question, my score is equal to 10", () => {
  const question = questionFactory({ status: "Rejected" });
  const action = createQuestion(question);

  const actual = getScore(reducer(undefined, action));
  const expected = 10;

  expect(actual).toBe(expected);
});

test("When I have multiple questions with different statuses, score gets calculated correctly", () => {
  const actions = [
    createQuestion(questionFactory({ status: "Unanswered" })),
    createQuestion(questionFactory({ status: "Accepted" })),
    createQuestion(questionFactory({ status: "Rejected" })),
  ];

  const actual = getScore(actions.reduce(reducer, undefined));
  const expected = 11;

  expect(actual).toBe(expected);
});
