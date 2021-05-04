import { Provider } from "react-redux";

import { Score } from "./score/index.js";
import { AddQuestionForm } from "./addQuestion/index.js";
import { ListOfQuestions } from "./listOfQuestions/index.js";

import "./App.css";

function App({ store }) {
  return (
    <Provider store={store}>
      <Score />
      <AddQuestionForm />
      <ListOfQuestions />
    </Provider>
  );
}

export default App;
