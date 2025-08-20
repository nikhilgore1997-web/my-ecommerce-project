import React, { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("User does not exist.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError("Authentication failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Google sign-in
  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/admin");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        setError("Popup closed before completing sign in.");
      } else {
        setError("Google Sign-In failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-5" style={{ width: "400px", borderRadius: "12px" }}>
        <h2 className="text-center mb-4">Admin Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email Address</label>
            <input type="email" className="form-control" required
              value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" required
              value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <div className="text-center mb-3">OR</div>
        <div className="text-center mb-3">
          <button
            type="button"
            className="btn btn-light w-100 border"
            onClick={handleGoogleSignIn}
            disabled={loading}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              style={{ width: "20px", marginRight: "8px" }}
            />
            Continue with Google
          </button>
        </div>
        <div className="text-center">
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot Password?
          </Link>
        </div>
        <div className="text-center mt-2">
          <small>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </small>
        </div>
      </div>
    </div>
  );
}
