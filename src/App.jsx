import "./css/App.css";
import Navbar from "./components/navbar";
import Favorite from "./pages/favorites";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import { AnimeProvider } from "./contexts/animecontext";

function App() {
  return (
    <AnimeProvider>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorite />} />
        </Routes>
      </main>
    </AnimeProvider>
  );
}

export default App;
