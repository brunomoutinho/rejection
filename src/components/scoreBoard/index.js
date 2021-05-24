import { connect } from 'react-redux';
import { getScore, getCurrentStreak } from '../../store/index.js';
import { CurrentStreak } from './currentStreak.js';
import { Score } from './score.js';

import styles from './index.module.css';

let ScoreBoard = ({ score, currentStreak, positionClass }) => (
	<div className={`${positionClass} ${styles.container}`}>
		<Score score={score} />
		<CurrentStreak currentStreak={currentStreak} />
	</div>
);

const mapStateToProps = (state) => ({
	score: getScore(state),
	currentStreak: getCurrentStreak(state),
});

ScoreBoard = connect(mapStateToProps)(ScoreBoard);

export { ScoreBoard };
