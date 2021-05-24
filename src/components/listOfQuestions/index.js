import { connect } from 'react-redux';
import { getQuestionsList } from '../../store/index.js';
import { acceptQuestion, rejectQuestion } from '../../store/question.js';

import styles from './index.module.css';

export const Question = ({
	onAccept,
	onReject,
	question: { question, askee, status, id } = {},
}) => {
	return (
		<div className={styles.question} data-testid={`question-${id}`}>
			<span>Question: {question}</span>
			<span>Askee: {askee}</span>
			<span>Status: {status}</span>
			{status === 'Unanswered' ? (
				<section>
					Modify status:
					<button onClick={() => onAccept(id)}>Accept</button>
					<button onClick={() => onReject(id)}>Reject</button>
				</section>
			) : null}
		</div>
	);
};

let ListOfQuestions = ({
	questions = [],
	positionClass,
	onAccept,
	onReject,
}) => {
	return (
		<div className={`${positionClass} ${styles.listOfQuestions}`}>
			{Array.isArray(questions) && questions.length > 0 ? (
				questions.map((question) => (
					<Question
						key={question.id}
						onAccept={onAccept}
						onReject={onReject}
						question={question}
					/>
				))
			) : (
				<span>There are no questions yet.</span>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	questions: getQuestionsList(state),
});

const mapDispatchToProps = {
	onAccept: acceptQuestion,
	onReject: rejectQuestion,
};

ListOfQuestions = connect(mapStateToProps, mapDispatchToProps)(ListOfQuestions);

export { ListOfQuestions };
