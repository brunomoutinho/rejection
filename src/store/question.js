export const reducer = (state, action) => {
  switch (action.type) {
    case createQuestion.type:
      return { ...action.payload };
    case rejectQuestion.type:
      return { ...state, status: "Rejected" };
    case acceptQuestion.type:
      return { ...state, status: "Accepted" };
    default:
      return state;
  }
};

export const createQuestion = (question) => ({
  type: createQuestion.type,
  payload: question,
});
createQuestion.type = "CREATE_QUESTION";

export const rejectQuestion = (id) => ({
  type: rejectQuestion.type,
  payload: { id },
});
rejectQuestion.type = "REJECT_QUESTION";

export const acceptQuestion = (id) => ({
  type: acceptQuestion.type,
  payload: { id },
});
acceptQuestion.type = "ACCEPT_QUESTION";

export const getQuestionScore = (question) =>
  question.status === "Rejected" ? 10 : question.status === "Accepted" ? 1 : 0;
