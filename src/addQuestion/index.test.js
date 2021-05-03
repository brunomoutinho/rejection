import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "../store/index.js";
import { AddQuestionForm } from "./index.js";

const renderApp = () => {
  const store = createStore(reducer);
  render(
    <Provider store={store}>
      <AddQuestionForm />
    </Provider>
  );
};

test("When the AddQuestionForm component loads, there should be an input to enter a question", () => {
  renderApp();
  const inputElement = screen.getByLabelText(/question/i);
  expect(inputElement).toBeInTheDocument();
});

test("When the AddQuestionForm component loads, there should be an input to enter the askee", () => {
  renderApp();
  const inputElement = screen.getByLabelText(/askee/i);
  expect(inputElement).toBeInTheDocument();
});

test("When the AddQuestionForm component loads, there should be an input to select the status of the question", () => {
  renderApp();
  const selectElement = screen.getByLabelText(/status/i);
  expect(selectElement).toBeInTheDocument();
});

test("When the AddQuestionForm component loads, there should be valid options for the status of the question", () => {
  renderApp();
  const selectElement = screen.getByLabelText(/status/i);
  const unansweredElement = within(selectElement).getByText(/unanswered/i);
  expect(unansweredElement).toBeInTheDocument();

  const acceptedElement = within(selectElement).getByText(/accepted/i);
  expect(acceptedElement).toBeInTheDocument();

  const rejectedElement = within(selectElement).getByText(/rejected/i);
  expect(rejectedElement).toBeInTheDocument();
});

test("When the AddQuestionForm component loads, there should be a button to save the question", () => {
  renderApp();
  const buttonElement = screen.getByText(/save/i);
  expect(buttonElement).toBeInTheDocument();
});

test("When I try to save the question with no fields filled, I get an error", () => {
  renderApp();
  userEvent.click(screen.getByText(/save/i));
  const questionInput = screen.getByLabelText(/question/i);
  expect(questionInput).toBeInvalid();
});
