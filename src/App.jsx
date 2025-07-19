import "./css/App.css";
import Navbar from "./components/Navbar";
import Favorite from "./pages/Favorites";
import Home from "./pages/Home";
import Login from "./components/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Register from "./components/Register";
import Watchlist from "./pages/WatchList";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();

  return (
    <UserProvider>
      {location.pathname.toLowerCase() !== "/login" &&
        location.pathname.toLowerCase() !== "/register" && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </UserProvider>
  );
}

export default App;
