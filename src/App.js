import { Provider } from "react-redux";

import { AddQuestionForm } from "./addQuestion/index.js";
import { ListOfQuestions } from "./listOfQuestions/index.js";
import { Score } from "./score/index.js";
import { CurrentStreak } from "./currentStreak/index.js";

import "./App.css";

function App({ store }) {
  return (
    <Provider store={store}>
      <div className="rejection-app-container">
        <header className={"header"}>
          <h1 className={"header__title"}>Rejection App</h1>
        </header>
        <AddQuestionForm positionClass={"form"} />
        <ListOfQuestions positionClass={"list"} />
        <Score positionClass={"score"} />
        <CurrentStreak positionClass={"streak"} />
      </div>
    </Provider>
  );
}

export default App;
