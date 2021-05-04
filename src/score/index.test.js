import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "../store/index.js";
import { Score } from "./index.js";
import { questionFactory } from "../question.js";
import { createQuestion } from "../store/question.js";

const renderApp = (actions = []) => {
  const store = createStore(reducer, actions.reduce(reducer, undefined));
  render(
    <Provider store={store}>
      <Score />
    </Provider>
  );
};

test("When no question exists, score is rendered as 0", () => {
  renderApp();
  const score = screen.getByText(/score/i).textContent;
  expect(score).toBe("Score: 0");
});

test("When only an unanswered question exists, score is rendered as 1", () => {
  const actions = [createQuestion(questionFactory())];
  renderApp(actions);
  const score = screen.getByText(/score/i).textContent;
  expect(score).toBe("Score: 0");
});

test("When only an accepted question exists, score is rendered as 1", () => {
  const actions = [createQuestion(questionFactory({ status: "Accepted" }))];
  renderApp(actions);
  const score = screen.getByText(/score/i).textContent;
  expect(score).toBe("Score: 1");
});

test("When only a rejected question exists, score is rendered as 10", () => {
  const actions = [createQuestion(questionFactory({ status: "Rejected" }))];
  renderApp(actions);
  const score = screen.getByText(/score/i).textContent;
  expect(score).toBe("Score: 10");
});

test("When a rejected and an accepted question exist, score is rendered as 11", () => {
  const actions = [
    createQuestion(questionFactory({ status: "Rejected" })),
    createQuestion(questionFactory({ status: "Accepted" })),
  ];
  renderApp(actions);
  const score = screen.getByText(/score/i).textContent;
  expect(score).toBe("Score: 11");
});
