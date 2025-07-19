import "../css/Auth.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/config";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const fromRegister = location.state?.fromRegister;
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="Header">
        <Link to="/">OtakuDynamics</Link>
        {fromRegister && (
          <p className="register-alert">
            Registration successful! Please log in to continue.
          </p>
        )}
      </div>
      <div className="container">
        <div className="login-box">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="Welcome">
              <h3>Welcome Back</h3>
              <p>
                Don't have an accounnt yet?
                <Link to="/register" className="sign-up">
                  Sign Up
                </Link>
              </p>
            </div>
            <div>
              <input
                type="email"
                value={email}
                placeholder="Email"
                className="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Password"
                  className="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="toggle-visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                    >
                      <g
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8M1 12s4 8 11 8 11-8 11-8" />
                        <circle cx="12" cy="12" r="3" />
                      </g>
                    </svg>
                  )}
                </span>
              </div>
              <p className="forgot-password">Forget Password?</p>
              <button type="submit" className="login-btn">
                Login
              </button>
            </div>
            <br />
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
