// AdminLogin.jsx
import React, { useState } from "react";
// useDispatch is used to send actions to Redux
import { useDispatch, useSelector } from "react-redux";
// Firebase function for login
import { signInWithEmailAndPassword } from "firebase/auth";
// Our Firebase auth instance
import { auth } from "../firebaseConfig";
// Redux actions from our slice
import { setUser, setError, setLoading } from "../redux/authSlice";

function AdminLogin() {
  // Local state for email and password fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Access Redux state (optional: to show errors/loading)
  const { loading, error } = useSelector((state) => state.auth);

  // To send actions to Redux
  const dispatch = useDispatch();

  // Function to handle admin login
  const handleLogin = async () => {
    dispatch(setLoading(true)); // Show loading spinner in UI
    try {
      // Firebase authentication call
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // If login successful, save user in Redux state
      dispatch(setUser(userCredential.user));

      // Clear any old errors
      dispatch(setError(null));
    } catch (err) {
      // If login fails, store error message in Redux
      dispatch(setError(err.message));
    } finally {
      // Stop loading spinner
      dispatch(setLoading(false));
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin Login</h2>

      {/* Email Input */}
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      {/* Password Input */}
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      {/* Login Button */}
      <button onClick={handleLogin} style={styles.button} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Error Message */}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

// Inline styles for quick design (you can use Bootstrap instead)
const styles = {
  container: {
    width: "300px",
    margin: "50px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
};

export default AdminLogin;
