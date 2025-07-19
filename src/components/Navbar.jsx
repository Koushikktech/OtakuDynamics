import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/Navbar.css";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { useUser } from "../contexts/UserContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const login = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={closeMenu}>
          OtakuDynamics
        </Link>
      </div>

      {/* Hamburger Menu Button */}
      <button
        className={`hamburger ${isMenuOpen ? "hamburger-active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Navigation Links */}
      <div className={`navbar-links ${isMenuOpen ? "navbar-links-open" : ""}`}>
        <Link to="/" className="navbar-link" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/watchlist" className="navbar-link" onClick={closeMenu}>
          Watch List
        </Link>
        <Link to="/favorites" className="navbar-link" onClick={closeMenu}>
          Favorites
        </Link>
        <div className="toggle-theme">
          <div className="theme-icon-wrapper">
            <button
              onClick={toggleTheme}
              className="navbar-theme"
              aria-label="Toggle theme"
              title={theme === "light" ? "Dark theme" : "Light theme"}
            >
              {theme === "light" ? (
                // Moon Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-moon h-5 w-5 text-blue-500"
                  aria-hidden="true"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
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
            <img src="/sukuna.png" alt="" className="sukuna" />
          </div>
        </div>
        {user ? (
          <button
            onClick={() => {
              logout();
              closeMenu();
            }}
            className="logout-link"
          >
            Logout
          </button>
        ) : (
          <button onClick={login} className="logout-link">
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
