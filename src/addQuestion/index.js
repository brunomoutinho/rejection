import { useState } from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../store/question.js';
import { questionFactory } from '../question.js';

import './index.css';

let AddQuestionForm = ({ onSave, positionClass }) => {
	const [question, setQuestion] = useState('');
	const [askee, setAskee] = useState('');
	const [status, setStatus] = useState('Unanswered');

	const onChangeQuestion = ({ target: { value = '' } = {} } = {}) =>
		setQuestion(value);
	const onChangeAskee = ({ target: { value = '' } = {} } = {}) =>
		setAskee(value);
	const onChangeStatus = ({ target: { value = '' } = {} } = {}) =>
		setStatus(value);

	const onSubmit = (event) => {
		event.preventDefault();
		const newQuestion = questionFactory({
			question,
			askee: askee.length > 0 ? askee : undefined,
			status,
		});
		onSave(newQuestion);
		setQuestion('');
		setAskee('');
		setStatus('Unanswered');
	};
	return (
		<div className={positionClass}>
			<form className={'form'} onSubmit={onSubmit}>
				<section className={'question'}>
					<label className={'question__label'} htmlFor="question">
						Question
					</label>
					<input
						className={'question__input'}
						id="question"
						onChange={onChangeQuestion}
						placeholder="Can I have another donut?"
						required
						value={question}
					></input>
				</section>

				<section className={'askee'}>
					<label className={'askee__label'} htmlFor="askee">
						Askee
					</label>
					<input
						className={'askee__input'}
						id="askee"
						onChange={onChangeAskee}
						placeholder="Anonymous"
						value={askee}
					></input>
				</section>

				<section className={'status-save-container'}>
					<section className={'status'}>
						<label className={'status__label'} htmlFor="status">
							Status
						</label>
						<select
							className={'status__select'}
							id="status"
							onChange={onChangeStatus}
							value={status}
						>
							<option value="Unanswered">Unanswered</option>
							<option value="Accepted">Accepted</option>
							<option value="Rejected">Rejected</option>
						</select>
					</section>

					<section className={'save'}>
						<button className={'save__button'}>Save</button>
					</section>
				</section>
			</form>
		</div>
	);
};

const mapDispatchToProps = {
	onSave: createQuestion,
};

AddQuestionForm = connect(() => ({}), mapDispatchToProps)(AddQuestionForm);

export { AddQuestionForm };
