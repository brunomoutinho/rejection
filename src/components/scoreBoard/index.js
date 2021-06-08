import { connect } from 'react-redux';
import { getScore, getCurrentStreak } from '../../store/index.js';
import { ScoreBoard as View } from './scoreBoard.js'

const mapStateToProps = state => ({
  score: getScore(state),
  currentStreak: getCurrentStreak(state)
});

export const ScoreBoard = connect(mapStateToProps)(View);
