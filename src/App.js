import "./App.css";

function App() {
  return (
    <div>
      <form>
        <label htmlFor="question">Question</label>
        <input id="question" placeholder="Can I have another donut?"></input>

        <label htmlFor="askee">Askee</label>
        <input id="askee" placeholder="Anonymous"></input>

        <label htmlFor="status">Status</label>
        <select id="status">
          <option value="Unanswered">Unanswered</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button>Save</button>
      </form>
    </div>
  );
}

export default App;
