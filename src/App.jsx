import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Game, Home } from "./pages";
import Temp from "./pages/Temp";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/game" exact element={<Game />} />
          <Route path="/temp" exact element={<Temp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
