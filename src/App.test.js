import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore } from "redux";

import App from "./App";
import { reducer } from "./store/index.js";

const renderApp = () => {
  const store = createStore(reducer);
  render(<App store={store} />);
};

test("When I save an unanswered question, it should be added to a list in the page and score should be 0", () => {
  renderApp();
  userEvent.type(
    screen.getByLabelText(/question/i),
    "May I have another cookie?"
  );
  userEvent.click(screen.getByRole("button", { name: /save/i }));

  const question = screen.getByText("May I have another cookie?");
  expect(question).toBeInTheDocument();

  const score = screen.getByText(/score/i).textContent;
  expect(score).toBe("Score: 0");
});

test("When I save an accepted question, it should be added to a list in the page and score should be 1", () => {
  renderApp();
  userEvent.type(
    screen.getByLabelText(/question/i),
    "May I have another cookie?"
  );
  userEvent.selectOptions(screen.getByLabelText(/status/i), ["Accepted"]);
  userEvent.click(screen.getByRole("button", { name: /save/i }));

  const question = screen.getByText("May I have another cookie?");
  expect(question).toBeInTheDocument();

  const score = screen.getByText(/score/i).textContent;
  expect(score).toBe("Score: 1");
});

test("When I save a rejected question, it should be added to a list in the page and score should be 10", () => {
  renderApp();
  userEvent.type(
    screen.getByLabelText(/question/i),
    "May I have another cookie?"
  );
  userEvent.selectOptions(screen.getByLabelText(/status/i), ["Rejected"]);
  userEvent.click(screen.getByRole("button", { name: /save/i }));

  const question = screen.getByText("May I have another cookie?");
  expect(question).toBeInTheDocument();

  const score = screen.getByText(/score/i).textContent;
  expect(score).toBe("Score: 10");
});
