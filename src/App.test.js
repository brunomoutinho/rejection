import { render, screen, within } from "@testing-library/react";
import App from "./App";

test("When the app loads, there should be an input to enter a question", () => {
  render(<App />);
  const inputElement = screen.getByLabelText(/question/i);
  expect(inputElement).toBeInTheDocument();
});

test("When the app loads, there should be an input to enter the askee", () => {
  render(<App />);
  const inputElement = screen.getByLabelText(/askee/i);
  expect(inputElement).toBeInTheDocument();
});

test("When the app loads, there should be an input to select the status of the question", () => {
  render(<App />);
  const selectElement = screen.getByLabelText(/status/i);
  expect(selectElement).toBeInTheDocument();
});

test("When the app loads, there should be valid options for the status of the question", () => {
  render(<App />);
  const selectElement = screen.getByLabelText(/status/i);
  const unansweredElement = within(selectElement).getByText(/unanswered/i);
  expect(unansweredElement).toBeInTheDocument();

  const acceptedElement = within(selectElement).getByText(/accepted/i);
  expect(acceptedElement).toBeInTheDocument();

  const rejectedElement = within(selectElement).getByText(/rejected/i);
  expect(rejectedElement).toBeInTheDocument();
});

test("When the app loads, there should be a button to save the question", () => {
  render(<App />);
  const buttonElement = screen.getByText(/save/i);
  expect(buttonElement).toBeInTheDocument();
});
