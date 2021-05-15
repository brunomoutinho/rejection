import { connect } from 'react-redux';
import { getScore } from '../store/index.js';

let Score = ({ score, positionClass }) => (
	<p className={positionClass}>Score: {score}</p>
);

const mapStateToProps = (state) => ({
	score: getScore(state),
});

Score = connect(mapStateToProps)(Score);

export { Score };
