import pipe from 'lodash/fp/pipe';

const formatQuestion = ({ timestamp, ...rest }) => ({
  ...rest,
  timestamp: new Date(timestamp),
});

const key = 'rejection_state';

export const getSavedState = () => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) {
      return undefined;
    }
    return pipe(
      JSON.parse,
      ({ questions }) => questions,
      (questions) =>
        Object.entries(questions).reduce(
          (questions, [id, question]) => ({
            ...questions,
            [id]: formatQuestion(question),
          }),
          {}
        ),
      (questions) => ({ questions })
    )(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  try {
    localStorage.setItem(key, serializedState);
  } catch (error) {
    return undefined;
  }
};
