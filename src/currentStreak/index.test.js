import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "../store/index.js";
import { add, set } from "date-fns";
import { CurrentStreak } from "./index.js";
import { questionFactory } from "../question.js";
import { createQuestion } from "../store/question.js";

const renderApp = (actions = []) => {
  const store = createStore(reducer, actions.reduce(reducer, undefined));
  render(
    <Provider store={store}>
      <CurrentStreak />
    </Provider>
  );
};

test("When there is no question in the store, current streak should be 0", () => {
  renderApp();

  const currentStreak = screen.getByText(/current streak/i).textContent;
  expect(currentStreak).toBe("Current Streak: 0");
});

test("When I have only an unanswered question in the store, current streak should be 0", () => {
  const actions = [createQuestion(questionFactory())];
  renderApp(actions);

  const currentStreak = screen.getByText(/current streak/i).textContent;
  expect(currentStreak).toBe("Current Streak: 0");
});

test("When I have only an accepted question in the store, current streak should be 0", () => {
  const actions = [createQuestion(questionFactory({ status: "Accepted" }))];
  renderApp(actions);

  const currentStreak = screen.getByText(/current streak/i).textContent;
  expect(currentStreak).toBe("Current Streak: 0");
});

test("When I have only a rejected question in the store, but it is from yesterday, current streak should be 0", () => {
  const yesterday = add(
    set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
    { days: -1 }
  );
  const actions = [
    createQuestion(
      questionFactory({ status: "Rejected", timestamp: yesterday })
    ),
  ];
  renderApp(actions);

  const currentStreak = screen.getByText(/current streak/i).textContent;
  expect(currentStreak).toBe("Current Streak: 0");
});

test("When I have only a rejected question in the store, and it is from today, current streak should be 1", () => {
  const actions = [createQuestion(questionFactory({ status: "Rejected" }))];
  renderApp(actions);

  const currentStreak = screen.getByText(/current streak/i).textContent;
  expect(currentStreak).toBe("Current Streak: 1");
});

test("When I have two rejected question in the store, one from yesterday and one from today, current streak should be 2", () => {
  const yesterday = add(
    set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
    { days: -1 }
  );
  const actions = [
    createQuestion(questionFactory({ status: "Rejected" })),
    createQuestion(
      questionFactory({ status: "Rejected", timestamp: yesterday })
    ),
  ];
  renderApp(actions);

  const currentStreak = screen.getByText(/current streak/i).textContent;
  expect(currentStreak).toBe("Current Streak: 2");
});

test("When I have two rejected question in the store, one from the day before yesterday and one from today, current streak should be 1", () => {
  const dayBeforeYesterday = add(
    set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
    { days: -2 }
  );
  const actions = [
    createQuestion(questionFactory({ status: "Rejected" })),
    createQuestion(
      questionFactory({ status: "Rejected", timestamp: dayBeforeYesterday })
    ),
  ];
  renderApp(actions);

  const currentStreak = screen.getByText(/current streak/i).textContent;
  expect(currentStreak).toBe("Current Streak: 1");
});
