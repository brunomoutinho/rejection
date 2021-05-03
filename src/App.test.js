import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

test("App renders", () => {
  render(<App />);
});

test("When I save a question, it should be added to a list in the page", () => {
  render(<App />);
  userEvent.type(
    screen.getByLabelText(/question/i),
    "May I have another cookie?"
  );
  userEvent.click(screen.getByText(/save/i));
  const question = screen.getByText("May I have another cookie?");
  expect(question).toBeInTheDocument();
});
