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
