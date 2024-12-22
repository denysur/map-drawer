import { useEffect, useMemo, useState, useTransition } from "react";
import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";

import { auth as firebaseAuth } from "../utils/firebase";

export const useAuthorization = () => {
  const [user, setUser] = useState<User | null>(null);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isActionLoading, startTransition] = useTransition();

  const isAuthorized = useMemo(() => !!user, [user]);
  const isLoading = useMemo(
    () => isInitialLoading || isActionLoading,
    [isInitialLoading, isActionLoading]
  );

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setIsInitialLoading(false);
      setUser(user);
    });
  }, []);

  const login = (email: string, password: string) => {
    startTransition(async () => {
      try {
        const data = await signInWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );

        setUser(data.user);
      } catch (e) {
        setUser(null);
      }
    });
  };

  const logout = () => {
    startTransition(async () => {
      try {
        await signOut(firebaseAuth);

        setUser(null);
      } catch (e) {
        setUser(null);
      }
    });
  };

  return useMemo(
    () => ({
      login,
      logout,
      isLoading,
      isAuthorized,
      user,
    }),
    [login, logout, isLoading, isAuthorized, user]
  );
};
