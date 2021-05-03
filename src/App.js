import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./store/index.js";

import { AddQuestionForm } from "./addQuestion/index.js";
import { ListOfQuestions } from "./listOfQuestions/index.js";

import "./App.css";

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <AddQuestionForm />
      <ListOfQuestions />
    </Provider>
  );
}

export default App;
