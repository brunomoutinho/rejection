import { connect } from 'react-redux';
import { createQuestion } from '../../store/question.js';

import './index.css';

let AddQuestionForm = ({ onSave, positionClass }) => {
	const onSubmit = (event) => {
		event.preventDefault();
		const {
			question: { value: question },
			askee: { value: askee },
			status: { value: status },
		} = event.target;
		onSave({ question, askee, status });
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
						placeholder="Can I have another donut?"
						required
					></input>
				</section>

				<section className={'askee'}>
					<label className={'askee__label'} htmlFor="askee">
						Askee
					</label>
					<input
						className={'askee__input'}
						id="askee"
						placeholder="Anonymous"
					></input>
				</section>

				<section className={'status-save-container'}>
					<section className={'status'}>
						<label className={'status__label'} htmlFor="status">
							Status
						</label>
						<select className={'status__select'} id="status">
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
