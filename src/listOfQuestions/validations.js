import { screen, within } from "@testing-library/react";

export const validateQuestionDisplay = ({ question, askee, status, id }) => {
  const questionContainer = screen.getByTestId(`question-${id}`);
  const questionText = within(questionContainer).getByText(
    `Question: ${question}`
  );
  expect(questionText).toBeInTheDocument();

  const askeeText = within(questionContainer).getByText(`Askee: ${askee}`);
  expect(askeeText).toBeInTheDocument();

  const statusText = within(questionContainer).getByText(`Status: ${status}`);
  expect(statusText).toBeInTheDocument();

  if (status === "Unanswered") {
    const modifyStatus = within(questionContainer).getByText("Modify status:");
    expect(modifyStatus).toBeInTheDocument();

    const acceptButton = within(questionContainer).getByRole(`button`, {
      name: /accept/i,
    });
    expect(acceptButton).toBeInTheDocument();

    const rejectButton = within(questionContainer).getByRole(`button`, {
      name: /reject/i,
    });
    expect(rejectButton).toBeInTheDocument();
  } else {
    const modifyStatus = within(questionContainer).queryByText(
      "Modify status:"
    );
    expect(modifyStatus).not.toBeInTheDocument();

    const acceptButton = within(questionContainer).queryByRole(`button`, {
      name: /accept/i,
    });
    expect(acceptButton).not.toBeInTheDocument();

    const rejectButton = within(questionContainer).queryByRole(`button`, {
      name: /reject/i,
    });
    expect(rejectButton).not.toBeInTheDocument();
  }
};
