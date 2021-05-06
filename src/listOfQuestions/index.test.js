import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { questionFactory } from "../question.js";
import { reducer } from "../store/index.js";
import { createQuestion } from "../store/question.js";
import { ListOfQuestions, Question } from "./index.js";
import { validateQuestionDisplay } from "./validations.js";

const noop = () => {};
const renderQuestion = (
  question,
  { onAccept = noop, onReject = noop } = {}
) => {
  render(
    <Question onAccept={onAccept} onReject={onReject} question={question} />
  );
};

const renderListOfQuestions = (actions = []) => {
  const store = createStore(reducer, actions.reduce(reducer, undefined));
  render(
    <Provider store={store}>
      <ListOfQuestions />
    </Provider>
  );
};

test("When I render an accepted question, the question information is displayed", () => {
  const question = questionFactory({ status: "Accepted" });
  renderQuestion(question), validateQuestionDisplay(question);
});

test("When I render a rejected question, the question information is displayed", () => {
  const question = questionFactory({ status: "Rejected" });
  renderQuestion(question), validateQuestionDisplay(question);
});

test("When I render an unanswered question, the question information is displayed", () => {
  const question = questionFactory();
  renderQuestion(question), validateQuestionDisplay(question);
});

test("When I render an unanswered question, the question information is displayed and onAccept is called if I click the Accept button", () => {
  const question = questionFactory();
  const onAccept = jest.fn();
  renderQuestion(question, { onAccept }), validateQuestionDisplay(question);

  const acceptButton = screen.getByRole("button", { name: /accept/i });
  userEvent.click(acceptButton);
  expect(onAccept).toHaveBeenCalledTimes(1);
  expect(onAccept).toHaveBeenLastCalledWith(question.id);
});

test("When I render an unanswered question, the question information is displayed and onReject is called if I click the Reject button", () => {
  const question = questionFactory();
  const onReject = jest.fn();
  renderQuestion(question, { onReject }), validateQuestionDisplay(question);

  const acceptButton = screen.getByRole("button", { name: /reject/i });
  userEvent.click(acceptButton);
  expect(onReject).toHaveBeenCalledTimes(1);
  expect(onReject).toHaveBeenLastCalledWith(question.id);
});

test("When I render two unanswered questions, the information for both is displayed correctly and onAccept is called with right parameters for both", () => {
  const question1 = questionFactory();
  const onAccept1 = jest.fn();
  renderQuestion(question1, { onAccept: onAccept1 }),
    validateQuestionDisplay(question1);

  const acceptButton1 = within(
    screen.getByTestId(`question-${question1.id}`)
  ).getByRole("button", { name: /accept/i });
  userEvent.click(acceptButton1);
  expect(onAccept1).toHaveBeenCalledTimes(1);
  expect(onAccept1).toHaveBeenLastCalledWith(question1.id);

  const question2 = questionFactory();
  const onAccept2 = jest.fn();
  renderQuestion(question2, { onAccept: onAccept2 }),
    validateQuestionDisplay(question2);

  const acceptButton2 = within(
    screen.getByTestId(`question-${question2.id}`)
  ).getByRole("button", { name: /accept/i });
  userEvent.click(acceptButton2);
  expect(onAccept2).toHaveBeenCalledTimes(1);
  expect(onAccept2).toHaveBeenLastCalledWith(question2.id);
});

test("When I render two unanswered questions, the information for both is displayed correctly and onReject is called with right parameters for both", () => {
  const question1 = questionFactory();
  const onReject1 = jest.fn();
  renderQuestion(question1, { onReject: onReject1 }),
    validateQuestionDisplay(question1);

  const rejectButton1 = within(
    screen.getByTestId(`question-${question1.id}`)
  ).getByRole("button", { name: /reject/i });
  userEvent.click(rejectButton1);
  expect(onReject1).toHaveBeenCalledTimes(1);
  expect(onReject1).toHaveBeenLastCalledWith(question1.id);

  const question2 = questionFactory();
  const onReject2 = jest.fn();
  renderQuestion(question2, { onReject: onReject2 }),
    validateQuestionDisplay(question2);

  const rejectButton2 = within(
    screen.getByTestId(`question-${question2.id}`)
  ).getByRole("button", { name: /reject/i });
  userEvent.click(rejectButton2);
  expect(onReject2).toHaveBeenCalledTimes(1);
  expect(onReject2).toHaveBeenLastCalledWith(question2.id);
});

test("When I render an empty list of questions, it shows a text indicating there are no questions", () => {
  renderListOfQuestions();
  const actual = screen.getByText("There are no questions yet.");
  expect(actual).toBeInTheDocument();
});

test("When I render a list with an accepted question, the question information is displayed", () => {
  const question = questionFactory({ status: "Accepted" });
  const actions = [createQuestion(question)];
  renderListOfQuestions(actions);

  validateQuestionDisplay(question);
});

test("When I render a list with a rejected question, the question information is displayed", () => {
  const question = questionFactory({ status: "Rejected" });
  const actions = [createQuestion(question)];
  renderListOfQuestions(actions);

  validateQuestionDisplay(question);
});

test("When I render a list with an unanswered question, the question information and the buttons to modify its status are displayed", () => {
  const question = questionFactory();
  const actions = [createQuestion(question)];
  renderListOfQuestions(actions);

  validateQuestionDisplay(question);
});

test("When I render a list with one question for each status, all of them appear correctly on the screen", () => {
  const acceptedQuestion = questionFactory({
    question: "May I have a donut?",
    askee: "Master Yoda",
    status: "Rejected",
  });
  const rejectedQuestion = questionFactory({
    question: "May I have a cookie?",
    askee: "Darth Vader",
    status: "Accepted",
  });
  const unansweredQuestion = questionFactory({
    question: "May I have a cake?",
    askee: "Bobba Fett",
    status: "Unanswered",
  });
  const actions = [
    createQuestion(acceptedQuestion),
    createQuestion(rejectedQuestion),
    createQuestion(unansweredQuestion),
  ];
  renderListOfQuestions(actions);

  validateQuestionDisplay(acceptedQuestion);
  validateQuestionDisplay(rejectedQuestion);
  validateQuestionDisplay(unansweredQuestion);
});
