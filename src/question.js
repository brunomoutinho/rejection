import cuid from "cuid";

export const questionFactory = ({
  id = cuid(),
  timestamp = new Date(),
  question = "Placeholder question",
  askee = "Anonymous",
  status = "Unanswered",
} = {}) => ({
  id,
  timestamp,
  question,
  askee,
  status,
});
