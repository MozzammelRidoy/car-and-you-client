import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";

export const AuthContext = createContext(null);
const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data and image loading
    const loadData = async () => {
      try {
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 3000));
        // Data and images loaded
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        // Handle error
      }
    };

    loadData();
  }, []); 

  //user registration with email and password
  const newUserCreate = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //user login with email and password
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // user login with google
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // user login with github
  const githubProvider = new GithubAuthProvider();
  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  //user forget password 
  const forgetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  }

  // user logout
  const userLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // user observing
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      subscribe();
    };
  }, []);

  const shareInfo = {
    user,
    loading,
    newUserCreate,
    userLogin,
    googleLogin,
    githubLogin,
    forgetPassword,
    userLogout,
  };
  return (
    <AuthContext.Provider value={shareInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
