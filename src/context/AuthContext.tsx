import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updatePassword,
  type User,
} from "firebase/auth";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../firebase/firebase.config";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  gmailLogin: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
      }
    } catch (err: any) {
      const errorMessage =
        err.message || "Signup failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      const errorMessage = err.message || "Login failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setError(null);
      await signOut(auth);
      setCurrentUser(null);
    } catch (err: any) {
      const errorMessage = err.message || "Logout failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const gmailLogin = async (): Promise<void> => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      const errorMessage =
        err.message || "Google login failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      const errorMessage =
        err.message || "Password reset failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const changePassword = async (newPassword: string): Promise<void> => {
    try {
      setError(null);
      if (!currentUser) {
        throw new Error("No user logged in");
      }
      await updatePassword(currentUser, newPassword);
    } catch (err: any) {
      const errorMessage =
        err.message || "Password change failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    gmailLogin,
    resetPassword,
    changePassword,
    error,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;