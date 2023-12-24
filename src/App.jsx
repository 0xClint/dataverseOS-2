import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Game, Home, Inventory, Profile } from "./pages";
import Temp from "./pages/Temp";
import { useEffect } from "react";
import {
  checkUser,
  createCapability,
  getFolderData,
} from "./utils/dataverseFuncCall";
import { useStore } from "./hooks/useStore";

function App() {
  const [isNewUser, setNewUser, setUserData] = useStore((state) => [
    state.isNewUser,
    state.setNewUser,
    state.setUserData,
  ]);

  useEffect(() => {
    const connectDataverse = async () => {
      await createCapability();
      setNewUser(await checkUser());

      if (!isNewUser) {
        const { name, cid, age, bio, color } = await getFolderData();

        setUserData({ name, cid, age, bio, color });
      }
    };
    connectDataverse();
  }, [isNewUser]);

  // useEffect(() => {}, []);

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
