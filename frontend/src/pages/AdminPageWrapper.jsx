// src/pages/AdminPageWrapper.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Admin from "./Admin";
import Login from "./Login";

const AdminPageWrapper = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // currentUser is null if not logged in
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  if (loading) return <p>Loading...</p>;

  // Show Admin if logged in, else Login
  return user ? <Admin /> : <Login />;
};

export default AdminPageWrapper;

