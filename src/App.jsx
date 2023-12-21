import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Game, Home, Inventory, Profile } from "./pages";
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
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/inventory" exact element={<Inventory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
