import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useTheme } from "../contexts/ThemeContext.jsx";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">OtakuDynamics</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/favorites" className="navbar-link">
          Favorites
        </Link>
        <button
          onClick={toggleTheme}
          className="navbar-theme"
          aria-label="Toggle theme"
          title={theme === "light" ? "Dark theme" : "Light theme"}
        >
          {theme === "light" ? (
            // Crescent Moon Icon
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21 12.5A9 9 0 0112.5 3c-.41 0-.82.03-1.22.08a8 8 0 109.64 9.64c.05-.4.08-.81.08-1.22z"
              />
            </svg>
          ) : (
            // Sun Icon
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" fill="#fff" />
              <g stroke="#fff" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="4" y2="12" />
                <line x1="20" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
              </g>
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
