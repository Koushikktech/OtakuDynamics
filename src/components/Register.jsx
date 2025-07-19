import "../css/Auth.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/config";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { loginWithGoogle } = useUser();
  const navigate = useNavigate();

  const handleregister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      navigate("/login", { state: { fromRegister: true } });
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="Header">
        <Link to="/">OtakuDynamics</Link>
      </div>
      <div className="container">
        <div className="login-box">
          <form className="login-form" onSubmit={handleregister}>
            <div className="Welcome">
              <h3>Create an account</h3>
              <p>
                Already have an account?
                <Link to="/login" className="sign-up">
                  Login
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
              <br />
              <button type="submit" className="login-btn">
                Sign up
              </button>
            </div>
          </form>
          <br />
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && (
            <p style={{ color: "green" }}>Account created successfully!</p>
          )}
          <div className="divider">
            <span>or</span>
          </div>

          <button className="google-login-btn" onClick={loginWithGoogle}>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="google-icon"
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
