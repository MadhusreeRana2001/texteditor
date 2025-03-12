import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Landing from "./components/Landing";
import TextEditor from "./components/Text-Editor";

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route exact path="/" element={<Landing />}></Route>
          <Route exact path="/text-editor" element={<TextEditor />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;