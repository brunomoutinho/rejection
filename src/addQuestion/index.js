import { useState } from "react";
import { connect } from "react-redux";
import { createQuestion } from "../store/question.js";
import { questionFactory } from "../question.js";

let AddQuestionForm = ({ onSave }) => {
  const [question, setQuestion] = useState("");
  const [askee, setAskee] = useState("");
  const [status, setStatus] = useState("Unanswered");

  const onChangeQuestion = ({ target: { value = "" } = {} } = {}) =>
    setQuestion(value);
  const onChangeAskee = ({ target: { value = "" } = {} } = {}) =>
    setAskee(value);
  const onChangeStatus = ({ target: { value = "" } = {} } = {}) =>
    setStatus(value);

  const onSubmit = (event) => {
    event.preventDefault();
    const newQuestion = questionFactory({
      question,
      askee,
      status,
    });
    onSave(newQuestion);
    setQuestion("");
    setAskee("");
    setStatus("Unanswered");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="question">Question</label>
        <input
          id="question"
          onChange={onChangeQuestion}
          placeholder="Can I have another donut?"
          required
          value={question}
        ></input>

        <label htmlFor="askee">Askee</label>
        <input
          id="askee"
          onChange={onChangeAskee}
          placeholder="Anonymous"
          value={askee}
        ></input>

        <label htmlFor="status">Status</label>
        <select id="status" onChange={onChangeStatus} value={status}>
          <option value="Unanswered">Unanswered</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button>Save</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  onSave: createQuestion,
};

AddQuestionForm = connect(() => ({}), mapDispatchToProps)(AddQuestionForm);

export { AddQuestionForm };
