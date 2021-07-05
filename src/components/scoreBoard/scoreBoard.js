import React from "react";
import { CurrentStreak } from "./currentStreak.js";
import { Score } from "./score.js";

import styles from "./index.module.css";

export const ScoreBoard = ({ score, currentStreak, positionClass }) => (
  <div className={`${positionClass} ${styles.container}`}>
    <Score score={score} />
    <CurrentStreak currentStreak={currentStreak} />
  </div>
);
