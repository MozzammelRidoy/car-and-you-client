import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { adminAuth } from "../../../Providers/firebase.config";

export const AdminAuthContext = createContext(null);

const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(true);

  // admin login
  const adminLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(adminAuth, email, password);
  };

  //admin forget password
  const adminForgetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(adminAuth, email);
  };

  //admin login
  const adminLogout = () => {
    setLoading(true);
    return signOut(adminAuth);
  };

  //admin Observing
  useEffect(() => {
    const subscribe = onAuthStateChanged(adminAuth, (currentUser) => {
      setAdmin(currentUser);
      setLoading(false);
    });
    return () => {
      subscribe();
    };
  }, []);

  const adminInfo = {
    admin,
    adminLogin,
    adminForgetPassword,
    adminLogout,
    loading,
  };

  return (
    <AdminAuthContext.Provider value={adminInfo}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider;
