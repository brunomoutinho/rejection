import { connect } from "react-redux";
import { getCurrentStreak } from "../store/index.js";

let CurrentStreak = ({ currentStreak }) => (
  <p>Current Streak: {currentStreak}</p>
);

const mapStateToProps = (state) => ({
  currentStreak: getCurrentStreak(state),
});

CurrentStreak = connect(mapStateToProps)(CurrentStreak);

export { CurrentStreak };
