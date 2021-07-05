import React from "react";
import compose from "lodash/fp/compose";
import { PageHOC } from "../pageHOC.js";
import { AddQuestionForm } from "../components/addQuestion/index.js";
import { ListOfQuestions } from "../components/listOfQuestions/index.js";
import { ScoreBoard } from "../components/scoreBoard/index.js";

import styles from "./index.module.css";

let Home = () => (
  <div className={styles.container}>
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Rejection App</h1>
    </header>
    <AddQuestionForm positionClass={styles.form} />
    <ListOfQuestions positionClass={styles.list} />
    <ScoreBoard positionClass={styles.scoreBoard} />
  </div>
);

export default compose(PageHOC)(Home);
