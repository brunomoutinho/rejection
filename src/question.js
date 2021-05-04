import cuid from "cuid";
import { set } from "date-fns";

export const questionFactory = ({
  id = cuid(),
  timestamp = set(new Date(), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  }),
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
